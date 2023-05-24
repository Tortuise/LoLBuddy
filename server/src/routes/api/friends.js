const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController')

// Load Friend model
const Friend = require('../../models/Friend');

// Load Authentication function
const requireAuth = require('../../middleware/requireAuth')
// require Auth for all user routes
router.use(requireAuth)

// @route GET api/users
// @description Get all friends by user id loop through all friends id
// @access Public
router.get('/', friendController.getAllFriend)

// @route GET api/friends/:id
// @description Get single friend by id
// @access Public
router.get('/:id', friendController.getFriend)

// @route POST api/friends
// @description add/save friend
// @access Public
router.post('/', friendController.createFriend)

// @route GET api/friends/:id
// @description Update friend
// @access Public
router.put('/:id', (req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(friend => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
});
