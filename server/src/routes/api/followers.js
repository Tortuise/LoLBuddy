const express = require('express');
const router = express.Router();
const followerController = require('../../controllers/followerController')
const userController = require('../../controllers/userController')

// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes
router.use(requireAuth)

// @route GET api/follower/find
// @description Search for follower
// @access Public
router.get('/find', userController.getUser)

// @route POST api/follower/add
// @description add follower to user
// @access Public
router.post('/add', userController.addUser)

// @route GET api/follower/showAll
// @description Search for followers of user
// @access Public
router.get('/showAll', userController.getFollowers)
module.exports = router;