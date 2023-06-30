const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')

// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes
router.use(requireAuth)

// @route GET api/followers/find
// @description Search for follower
// @access Public
router.get('/find', userController.getUser)

// @route GET api/followers/followers
// @description get followers from user
// @access Public
router.get('/followers', userController.getFollowers)

// @route GET api/follower/following
// @description get following from user
// @access Public
router.get('/following', userController.getFollowing)

// @route POST api/followers/add
// @description add follower to user
// @access Public
router.post('/add', userController.addUser)

// @route POST api/followers/unfollow
// @description unfollow follower from user
// @access Public
router.post('/unfollow', userController.unfollow)

// @route GET api/follower/showAll
// @description Search for followers of user
// @access Public
router.get('/showAll', userController.getFollowers)
module.exports = router;