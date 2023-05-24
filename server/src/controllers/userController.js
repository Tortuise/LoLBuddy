// Load User model
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

//login user
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

//register user
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

module.exports = {loginUser, registerUser, setPlayerData, getUser}