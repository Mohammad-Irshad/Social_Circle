const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    fullName : {
        type : String,
        require : true
    },
    userName : {
        type : String,
        require : true
    },
    postText : {
        type : String,
        require : true
    },
    userImage : {
        type : String,
        require : true
    },
    postMedia : String,
    postGif : String,
    postLikes : Number,
    postComments : [{
        fullName : String,
        userName : String,
        userImage : String,
        userComment : String
    }],
    postShare : Number
}, {timestamps : true})

const Posts = mongoose.model("Posts", postSchema)

module.exports = Posts