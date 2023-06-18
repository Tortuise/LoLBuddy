const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')
require('dotenv').config();
const axios = require('axios')

const User = require('../../models/User');

router.get('/test', (req, res) => res.send('user route testing!'));

// @route POST /api/auth
// @description login user
router.post('/login', userController.loginUser);

// @route POST api/auth
// @description register user
router.post('/register', userController.registerUser);

// @route POST api/auth
// @description update password
router.put('/settings', userController.updatePassword);

router.get('/refresh');


router.post('/logout');


module.exports = router;
