// Load User model
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const createToken = (_id, checked) => {
    if (checked) {
        return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30d'})
    }
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {username, password, checked} = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id, checked)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// register user
const registerUser = async (req, res) => {
    
    const {username, password} = req.body
    
    try {
        const user = await User.register(username, password)
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update password
const updatePassword = async (req, res) => {
    const username = req.query.username;
    const {oldPassword, newPassword} = req.body
    try {
        const user = await User.changePassword(username,oldPassword, newPassword)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// set the user data with player data
const setPlayerData = async (req, res) => {
  
    User.findOneAndUpdate({username: req.params.username}, req.body)
      .then(user => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
        );
};

const getUser = (req, res) => {
    const player_name = req.query.username

    User.findOne({username: player_name})
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ nousersfound: 'No User found' }));
}

// add follower (another user) to user
const addUser = async (req, res) => {
	const username = req.query.username
	try {
        const follower = await User.findOne({username: req.body.username});
        const user = await User.findOneAndUpdate({username: username},{$push:{followers:follower._id}});
        await User.findOneAndUpdate({username: req.body.username},{$push:{following:user._id}});
		res.json({ msg: 'Follower added successfully'})
	} catch (err) {
		console.log({err:err + ' error adding follower'})
	}
}

// get all followers from user
const getFollowers = async (req, res) => {
    const user = req.query.username

    try {
        const followers = await User.findOne({username: user}).select('followers')
        const followersData = []
        if (!followers.followers) {
            res.json(null);
            console.log('No one you follow');
            return;
        }
		for (let i = 0; i < followers.followers.length; i++) {
			try {
				let follower = await User.findById(followers.followers[i])
				
				followersData.push(follower)
			} catch (err) {
				console.log('error follower not found' );
			}	
		}
		res.status(200).json(followersData)
    } catch (err) {
        console.log({err:err + ' error getting followers'});
        res.status(404).json(null);
    }
}

// get all following the user
const getFollowing = async (req, res) => {
    const user = req.query.username

    try {
        const following = await User.findOne({username: user}).select('following')
        const followersData = []
		for (let i = 0; i < following.following.length; i++) {
			try {
				let follower = await User.findById(following.following[i])
				
				followersData.push(follower)
			} catch (err) {
				console.log('error followings not found' )
                res.status(404).json(null);
			}	
		}
		res.status(200).json(followersData)
    } catch (err) {
        console.log({err:err + ' error getting followings'});
        res.status(404).json(null);
    }
}

// unfollow follower from user
const unfollow = async (req, res) => {
	const username = req.query.username
	try {
        const follower = await User.findOne({username: req.body.username});
        const user = await User.findOneAndUpdate({username: username},{$pull:{followers:follower._id}});
        await User.findOneAndUpdate({username: req.body.username},{$pull:{following:user._id}});
		res.json({ msg: 'unfollowed successfully'})
	} catch (err) {
		console.log({err:err + ' error unfollowing'})
	}
}

// set main champion of user
const setMain = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {Main:req.body.champ.label});
        res.status(200).json(user);
    } catch (e) {
        console.log({err:e + ' error setting main'});
    }
}
module.exports = {loginUser, registerUser, updatePassword, setPlayerData, getUser, addUser, getFollowers, getFollowing, unfollow, setMain}