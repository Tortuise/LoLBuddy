const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController')

// Load Friend model
const Friend = require('../../models/Friend');


// @route GET api/users
// @description Get all friends by user id loop through all friends id
// @access Public
// router.get('/', (req, res) => {
//     User.find()
//       .then(users => res.json(users))
//       .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
// });

// @route GET api/friends/:id
// @description Get single friend by id
// @access Public
router.get('/:id', (req, res) => {
    Friend.findById(req.params.id)
      .then(friend => res.json(user))
      .catch(err => res.status(404).json({ nofriendfound: 'No Friend found' }));
});

// @route POST api/friends
// @description add/save friend
// @access Public
router.post('/', (req, res) => {
    Friend.create(req.body)
      .then(user => res.json({ msg: 'Friend added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this friend' }));
});

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
