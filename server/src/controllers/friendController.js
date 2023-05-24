const Friend = require('../models/Friend');

const getAllFriend = (req, res) => {
    Friend.find()
      .then(friends => res.json(friends))
      .catch(err => res.status(404).json({ nofriendsfound: 'No Friends Yet :)))', err:err }));
}

// @route GET api/friends/:id
// @description Get single friend by id
// @access Public
const getFriend = (req, res) => {
    Friend.findById(req.params.id)
      .then(friend => res.json(friend))
      .catch(err => res.status(404).json({ nofriendfound: 'No Friend found' ,err:err}));
}

// @route GET api/users
// @description add/save user
// @access Public
const createFriend = (req, res) => {
    Friend.create(req.body)
      .then(friend => res.json({ msg: 'Friend added successfully' , friend:friend}))
      .catch(err => res.status(400).json({ error: 'Unable to add friend' , err:err}));
}
module.exports = {getFriend, createFriend, getAllFriend}