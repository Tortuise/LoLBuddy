const mongoose = require('mongoose');


const FriendSchema = new mongoose.Schema({
    Name: {
    	type: String,
    },
    SummonerName: {
    	type: String,
        required : true,
    },
    SummonerLvl: {
        type: String,
        required : true,
    },
    ProfileIconId: {
        type: String,
        required : true,
    },
    PUUID: {
        type: String,
        required : true,
    	unique: true
    }
});

module.exports = User = mongoose.model('friend', FriendSchema);