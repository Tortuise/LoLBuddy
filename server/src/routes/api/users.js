// routes/api/users.js

const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios')

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// call RIOT API get player data
function searchForPlayer(name) {
	let server = "oc1"
	let APICallString = "https://"+server+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+process.env.REACT_APP_RIOT_API
	return axios.get(APICallString).then(res => {
    	return res.data

  	}).catch(function (error){
    	console.log(error)

	});
	

}
// @route GET api/users/name
// @description use Riot API find summoner name of user
// @access Public
router.get('/name', async (req, res) => {
	const player_name = req.query.username
	try {
		const name = await searchForPlayer(player_name)
		res.send(name)
	} catch(e) {
		res.sendStatus(500)
	}
	
});


// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
  });

// @route GET api/users/:id
// @description Get single User by id
// @access Public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
  });

// @route GET api/users
// @description add/save user
// @access Public
router.post('/', (req, res) => {
    User.create(req.body)
      .then(user => res.json({ msg: 'User added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
  });

// @route GET api/users/:id
// @description Update user
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete('/:id', async (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});


module.exports = router;