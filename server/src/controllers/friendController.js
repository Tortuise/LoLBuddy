const Friend = require('../models/Friend');
const User = require('../models/User');

// @route GET api/friends/
// @description Get all friend id of user 
// @access Public
const getAllFriend = async (req, res) => {
    const player_name = req.query.username
	try {
		const friendList = await User.findOne({username: player_name}).select('friends')
		const friendArr = []
		for (let i = 0; i < friendList.friends.length; i++) {
			try {
				let friend = await Friend.findById(friendList.friends[i])
				
				friendArr.push(friend)
			} catch (err) {
				console.log('error friend not found' )
			}	
		}
		res.status(200).send(friendArr)
	} catch (err) {
		res.status(404).send([])
		console.log({err:err, nofriendsfound: 'No Friends Yet :)))'})
	}  
}

// @route GET api/friends/:id
// @description Get single friend by id
// @access Public
const getFriend = (req, res) => {
    Friend.findById(req.params.id)
      .then(friend => res.json(friend))
      .catch(err => res.status(404).json({ nofriendfound: 'No Friend found' ,err:err}));
}

// @route POST api/friends
// @description add friend to database and add friend id to user
// @access Public
const createFriend = async (req, res) => {
	const player_name = req.query.username
	try {
		// if friend already exist in database
		const exists = await Friend.exists({SummonerName: req.body.SummonerName})
		// check if already added
		// add to user
		if (exists) {
			const friend = await Friend.findOne({SummonerName: req.body.SummonerName})
			await User.findOneAndUpdate({username: player_name},{$push:{friends:friend._id}})
		} else {
			const friend = await Friend.create(req.body)
			await User.findOneAndUpdate({username: player_name},{$push:{friends:friend._id}})
		}
		res.json({ msg: 'Friend added successfully'})
	} catch (err) {
		console.log({err:err + ' error creating friend'})
	}
}

// @route GET api/friends/:id
// @description Delete friend by id from user friendlist
// @access Public
const deleteFriend = async (req, res) => {
	const player_name = req.query.username
	try {
		await User.findOneAndUpdate({username: player_name},{$pull:{friends:req.params.id}})
		res.json({ mgs: 'Friend entry deleted successfully' })
	} catch (err) {
		res.status(404).json({ error: 'No such user' , err:err})
	}
};

module.exports = {getFriend, createFriend, getAllFriend, deleteFriend}