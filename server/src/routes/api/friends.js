const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController')
const riotController = require('../../controllers/riotController')

// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes
router.use(requireAuth)

// @route GET api/friends/lolmatches
// @description Get matches by puuid
// @access Public
router.get('/lolmatches', riotController.get5Match);

// @route GET api/friends/:id
// @description Get single friend by id
// @access Public
router.get('/:id', friendController.getFriend)

// @route GET api/users
// @description Get all friends by user id loop through all friends id
// @access Public
router.get('/', friendController.getAllFriend)


// @route POST api/friends
// @description add/save friend
// @access Public
router.post('/', friendController.createFriend)

// @route DELETE api/friends/:id
// @description Delete user by id
// @access Public
router.delete('/:id', friendController.deleteFriend);



module.exports = router;