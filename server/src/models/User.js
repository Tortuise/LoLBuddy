// models/User.js
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    PUUID: {
    	type: String,
    },
    SummonerName: {
    	type: String,
    },
    SummonerLvl: {
        type: String,
    },
    ProfileIconId: {
    	type: String,
    },
    friends: {
        type: [String],
    },
    username: {
    	type: String,
    	required : true,
    	unique: true
    },
    password: {
        type: String,
        required: true
    },
	followers: { // people the user is following
		type: [String],
	},
	following: { // people following the user
		type: [String],
	},
	posts: {
		type: [String],
	},
	Likes: {
		type: [String],
	},
	Main: {
		type: String,
	},
});

// static register method
UserSchema.statics.register = async function (username, password) {
	// validation 
	if (!username || !password) {
		throw Error('All fields must be filled')
	}
	if (!validator.isStrongPassword(password)) {
		
		throw Error('Password not strong enough minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,')
	}
	const exists = await this.findOne({username})

	if (exists) {
		console.log('error')
		throw Error('Username already in use')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({username, password: hash})
	
	return user

}
// static login method
UserSchema.statics.login = async function(username, password) {
	// validation 
	if (!username || !password) {
		throw Error('All fields must be filled')
	}
	const user = await this.findOne({username})

	if (!user) {
		throw Error('Incorrect username')
	}
	const match = await bcrypt.compare(password, user.password)
	if (!match) {
		throw Error('Incorrect password')
	}
	return user

}
// static update method
UserSchema.statics.changePassword = async function(username, oldPassword, newPassword) {
	// validation
	if (!oldPassword || !newPassword) {
		throw Error('All fields must be filled')
	}
	const user = await this.findOne({username})
	const match = await bcrypt.compare(oldPassword, user.password)
	if (!match) {
		throw Error('Incorrect current password')
	}

	const matchOld = await bcrypt.compare(newPassword, user.password)
	if (matchOld) {
		throw Error('Same password as current')
	}

	if (!validator.isStrongPassword(newPassword)) {
		
		throw Error('Password not strong enough minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(newPassword, salt)

	const res = await this.updateOne({username:username}, {password: hash})
	return res
}
module.exports = User = mongoose.model('user', UserSchema);