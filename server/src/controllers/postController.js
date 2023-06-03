const User = require('../models/User');
const Post = require('../models/Post');

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

const getPostsFromUser = async (req, res) => {
    const id = req.params.id

    try {
		const posts = await User.findById(id) 
		const postArr = []
		for (let i = 0; i < posts.posts.length; i++) {
			const post = await Post.findById(posts.posts[i])
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

// from user id get all posts from all user followers
const getAllPosts = async (req, res) => {
	try {
		const data = await User.findOne({username:req.query.username}).select('followers') 
		const followers = data.followers
		const postData = []

		for (let i = 0; i < followers.length; i++) {
			try {
				const posts = await User.findById(followers[i]).select('posts')

				for (let j = 0; j < posts.posts.length; j++) {
					const post = await Post.findById(posts.posts[j])
					postData.push(post)
				}
			} catch (e) {
				res.status(400).json({ error: e, msg:'unable to get follower posts'})
			}
			
		}
	
        res.json(postData)
	} catch(e) {
		res.status(400).json({ error: 'Unable to get posts from followers' })
	}


}
module.exports = {createPost, deletePost, getPostsFromUser, getAllPosts}
