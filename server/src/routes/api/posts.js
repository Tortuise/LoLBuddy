const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios')
const userController = require('../../controllers/userController')
const postController = require('../../controllers/postController')


// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes

router.use(requireAuth)

// @route post api/posts/post
// @description create post
// @access Public
router.post('/post', postController.createPost)

// @route GET api/posts/all/:id
// @description get all posts from all followers using user id
// @access Public
router.get('/all/', postController.getAllPosts)

// @route GET api/posts/:id
// @description get all posts from user id
// @access Public
router.get('/:id', postController.getPostsFromUser)

// @route GET api/posts/:id
// @description delete post
// @access Public
router.delete('/:id', postController.deletePost)
module.exports = router;