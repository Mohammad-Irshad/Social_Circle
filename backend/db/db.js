const mongoose = require('mongoose')

const mongoURI = mongoDBURL

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        if(connection){
            console.log("Connected successfully")
        }
    }catch(error){
        console.log("Connection failed : ",error)
    }
}

module.exports = {initializeDatabase}