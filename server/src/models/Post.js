const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    Text: {
    	type: String,
    },
    Date: {
        type: Date,
    },
    Img: {
        type: String,
    },
    username: {
        type: String,
    },  
    userId: {
        type: String,
    },
    ProfileIconId: {
        type: String,
    },
},{timestamps: true })
    

module.exports = Post = mongoose.model('post', PostSchema);