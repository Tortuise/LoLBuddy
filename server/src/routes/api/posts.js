const express = require('express');
const router = express.Router();
require('dotenv').config();

const multer = require("multer");
const upload = multer({dest: "uploads/" });

const postController = require('../../controllers/postController')


// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes

router.use(requireAuth)

// @route post api/posts/post
// @description create post
// @access Public
router.post('/post', postController.createPost)

// @route post api/posts/image
// @description upload image to s3
// @access Public
router.post('/image',upload.single("image"), postController.uploadImage)

// @route GET api/posts/all/
// @description get all posts from all followers using user id
// @access Public
router.get('/all/', postController.getAllPosts)

// @route GET api/posts/image
// @description get image from S3
// @access Public
router.get('/image/', postController.getImage)

// @route GET api/posts/:id
// @description get all posts from user id
// @access Public
router.get('/:id', postController.getPostsFromUser)

// @route GET api/posts/:id
// @description delete post
// @access Public
router.delete('/:id', postController.deletePost)

// @route PUT api/like/:id
// @description add like to user and post
// @access Public
router.put('/like', postController.addLike)

module.exports = router;