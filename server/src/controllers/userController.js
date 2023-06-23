// Load User model
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// register user
const registerUser = async (req, res) => {
    
    const {username, password} = req.body
    
    try {
        console.log('test server run registerUser');
        const user = await User.register(username, password)
        console.log('register authenticated');
        const token = createToken(user._id)
        console.log('token created');
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
	const user = req.query.username
	try {
        const follower = await User.findOne({username: req.body.username})
        await User.findOneAndUpdate({username: user},{$push:{followers:follower._id}})
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
		for (let i = 0; i < followers.followers.length; i++) {
			try {
				let follower = await User.findById(followers.followers[i])
				
				followersData.push(follower)
			} catch (err) {
				console.log('error follower not found' )
			}	
		}
		res.status(200).json(followersData)
    } catch (err) {
        console.log({err:err + ' error getting followers'});
    }
}
module.exports = {loginUser, registerUser, updatePassword, setPlayerData, getUser, addUser, getFollowers}