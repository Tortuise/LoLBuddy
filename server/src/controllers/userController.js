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
module.exports = {loginUser, registerUser}