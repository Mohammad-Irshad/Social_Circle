const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        require : true
    },
    userName : {
        type : String,
        require : true
    },
    userBio : {
        type : String,
        require : true,
        default : "Hey ! I am using social_circle."
    },
    userEmail : {
        type : String,
        require : true
    },
    userPassword : {
        type : String,
        require : true
    },
    userConfirmPassword : {
        type : String,
        require : true
    },
    userWebsite : String,
    following : [String],
    posts : Number,
    followers : [String],
    bookmarkPosts : [String],
    likedPosts : [String],
    userImage : {
        type : String,
        require : true,
        default : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1724662582~exp=1724666182~hmac=ed926917c38b780ae3a39b45aca90c7e650734969e86ac82c02254a08a7c18ed&w=740"
    }
},{timestamps : true})

const Users = mongoose.model("Users", userSchema)

module.exports = Users