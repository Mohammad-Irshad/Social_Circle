const express = require('express')
const cors = require('cors')
const {initializeDatabase} = require('./db/db')
const Posts = require('./model/post.model')
const Users = require('./model/user.model')
require('dotenv').config()

const app = express()

const corsOptions = {
    origin : '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions))
app.use(express.json())

initializeDatabase()

app.get('/', async (req, res) => {
    try{
        res.send("Welcome to social_circle server")
    }catch(error){
        console.log(error)
    }
})


// function to seed data

async function addPost(newPost){
    try{
        const Post = new Posts(newPost) 
        const savePost = await Post.save()
        return savePost
    }catch(error){
        console.log("Can't save the post in the database",error)
    }
}


// api to seed data

app.post('/api/user/post', async (req, res) => {
    try{
        const addedPost = await addPost(req.body)
        if(addedPost){
            res.status(200).json(addedPost)
        }else{
            res.status(404).json({message : "Can't add the post!"})
        }
    }catch(error){
        res.status(500).json({error : "Failed to add post in the database!"})
    }
})


// function to get all post from the db

async function getAllPosts(){
    try{
        const allPosts = await Posts.find()
        return allPosts
    }catch(error){
        console.log(error)
    }
}

// api to get all posts from the db

app.get("/api/posts", async (req, res) => {
    try{
        const allPosts = await getAllPosts()
        if(allPosts.length > 0){
            res.status(200).json(allPosts)
        }else{
            res.status(404).json({error : "No post found!"})
        }
    }catch(error){
        res.status(500).json({error : "Failed to fetch the posts from db"})
    }
})

// function to get post by id

async function getPostById(postId){
    try{
        const post = await Posts.findById(postId)
        return post
    }catch(error){
        console.log(error)
    }
}

// api to get post by id

app.get('/api/posts/:postId', async (req, res) => {
    try{
        const post = await getPostById(req.params.postId)
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({error : "No post found!"})
        }
    }catch(error){
        res.status(500).json({message : "Failed to fetch the post from db"})
    }
})

// function to update a post

async function updatePost(postId, updatedData){
    try{
        const updatedPost = await Posts.findByIdAndUpdate(postId, updatedData, {new : true})
        return updatedPost
    }catch(error){
        console.log(error)
    }
}

// api to update a post by id

app.post('/api/posts/edit/:postId', async (req, res) => {
    try{
        const post = await updatePost(req.params.postId, req.body)
        if(post){
            res.status(200).json({message : "Post updated successfully", post})
        }else{
            res.status(404).json({error : "Post not found"})
        }
    }catch(error){
        res.status(500).json({message : "Failed to update the post"})
    }
})

// function to delete a post

async function deletePost(postId){
    try{
        const deletedPost = await Posts.findByIdAndDelete(postId)
        return deletedPost
    }catch(error){
        console.log(error)
    }
}

// api to delete a post by id

app.delete('/api/user/posts/:postId', async (req, res) => {
    try{
        const dltdPost = await deletePost(req.params.postId)
        if(dltdPost){
            res.status(200).json(dltdPost)
        }else{
            res.status(404).json({error : "Post not found!"})
        }
    }catch(error){
        res.status(500).json({message: "Failed to delete the post"})
    }
})



// USER API'S

// register user function

async function registerUser(userData) {
    try{
        const user = new Users(userData)
        const addedUser = await user.save()
        return addedUser
    }catch(error){
        console.log(error)
    }
}


// register user api

app.post("/api/registerUser", async (req, res) => {
    try{
        const user = await registerUser(req.body)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({error : "Can't add the user"})
        }
    }catch(error){
        res.status(500).json({message : "Failed to add user"})
    }
})

// funciton to get all the user from database

async function getAllUsers() {
    try{
        const allUsers = await Users.find()
        return allUsers
    }catch(error){
        console.log(error)
    }
    
}

// api to get all the users

app.get("/api/users", async (req, res) => {
    try{
        const users = await getAllUsers()
        if(users.length > 0){
            res.status(200).json(users)
        }else{
            res.status(404).json({error : "No uer found"})
        }
    }catch(error){
        res.status(500).json({message : "Failed to get all the users"})
    }
})


// function to update userData

async function updateUserData(userId, updatedData){
    try{
        const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, {new : true})
        return updatedUser
    }catch(error){
        console.log(error)
    }
}

app.post('/api/user/updateData/:userId', async (req, res) => {
    try {
        const updatedUser = await updateUserData(req.params.userId, req.body)
        if(updatedUser){
            res.status(200).json(updatedUser)
        }else{
            res.status(404).json({error : "Did not find the user"})
        }
    } catch (error) {
        res.status(500).json({message : "Failed to update the user data"})
    }   
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("App is running on ", PORT)
})

