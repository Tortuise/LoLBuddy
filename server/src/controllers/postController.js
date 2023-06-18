const AWS = require("aws-sdk");
const fs = require("fs");
const User = require('../models/User');
const Post = require('../models/Post');


const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

// create post and add to user
const createPost = async (req, res) => {
    const username = req.query.username
    try {
		const post = await Post.create(req.body) 
        await User.findOneAndUpdate({username: username},{$push:{posts:post._id}})
        res.json({ msg: 'Post added successfully' , post: post})

		
	} catch(e) {
		res.status(400).json({ error: 'Unable to add this Post' })
	}
}

// get all posts from a user
const getPostsFromUser = async (req, res) => {
    const id = req.params.id

    try {
		const posts = await User.findById(id) 
		const postArr = []
		for (let i = 0; i < posts.posts.length; i++) {
			let post = await Post.findById(posts.posts[i])
			postArr.push(post)
		}
        res.json(postArr)
	} catch(e) {
		res.status(400).json({ error: 'Unable to get posts from this User' })
	}
}


// delete post and from user posts TODO TEST
const deletePost = async (req, res) => {
	const username = req.query.username
    try {
		await Post.findByIdAndRemove(req.params.id, req.body)
		await User.findOneAndUpdate({username: username},{$pull:{posts:req.params.id}})
        res.json({ mgs: 'User entry deleted successfully' })
	} catch(e) {
		res.status(404).json({ error: 'No such a user' })
	}

}
// compare dates of posts objects
function compare(a, b) {
	if ( a.createdAt > b.createdAt) {
		return -1;
	}
	if ( a.createdAt < b.createdAt) {
		return 1;
	} else {
		return 0;
	}
}
// from user id get all posts from all user followers
const getAllPosts = async (req, res) => {
	try {
		const data = await User.findOne({username:req.query.username}).select({followers: 1, posts: 1}) 
		const followers = data.followers
		const postData = []
		const userPosts = data.posts
		
		for (let k = 0; k < userPosts.length; k++) {
			let post = await Post.findById(userPosts[k])
			postData.push(post)
		}

		for (let i = 0; i < followers.length; i++) {
			try {
				const posts = await User.findById(followers[i]).select('posts')

				for (let j = 0; j < posts.posts.length; j++) {
					let post = await Post.findById(posts.posts[j])
					postData.push(post)
				}
			} catch (e) {
				res.status(400).json({ error: e, msg:'unable to get follower posts'})
			}
			
		}
		// sort all posts by createdAt date
		postData.sort( compare )
        res.json(postData)
	} catch(e) {
		res.status(400).json({ error: 'Unable to get posts from followers' })
	}


}

// upload image to s3 bucket
const uploadImage = async (req, res) => {
	const username = req.query.username
	try {
		if (!req.file) {
		  throw new Error("no file");
		}
		const filename = username + req.file.filename;
		const fileContent = fs.readFileSync(req.file.path);
		const params = {
			Bucket: process.env.BUCKET,
			Key: `${filename}.png`,
			Body: fileContent,
			ContentType:'image/png',
		};

		s3.upload(params, function (err, data) {if (err) {
			res.status(500);
			res.json({message:err.message});
			fs.unlinkSync(req.file.path);
		  }
		  if (data) {
			res.status(200);
			res.json(`${filename}.png`);
		  }
		});
		fs.unlinkSync(req.file.path);
	} catch (err) {
		res.status(500).json(err);
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
	}
}

// get image from s3 bucket
const getImage = async (req, res) => {
	const data = req.query.data
	try {
		const signedUrl = s3.getSignedUrl('getObject',{
			Bucket: process.env.BUCKET,
			Key: data.Img,
			Expires: 86400, // 24 hours
		})
		res.status(200).json(signedUrl)
	} catch (e) {
		res.status(500);
		res.json({message:e.message});
	}
	
}

// add like to post and user
const addLike = async (req, res) => {
	const username = req.query.username;
	try {
		// check if already liked
		const exist = await Post.exists({_id:req.body._id, Likes:username})
		if (exist) {
			res.status(200).json({msg:'already added like'})
		} else {
			await Post.findOneAndUpdate({_id: req.body._id},{$push:{Likes:username}})
			await User.findOneAndUpdate({username: username},{$push:{Likes:req.body._id}})
			res.status(200).json({msg:'added like'})
		}
		
	} catch (e) {
		console.log(e);
		res.status(400).json({error:e})
	}
}
module.exports = {createPost, deletePost, getPostsFromUser, getAllPosts, uploadImage, getImage, addLike}
