import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// add a post 
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post('http://localhost:3000/api/user/post', newPost)
    // console.log(response.data)
    return response.data
})

// get all the posts

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    const response = await axios.get('http://localhost:3000/api/posts')
    // console.log(response.data)
    return response.data
})

// updated a post

export const updatePost = createAsyncThunk('posts/updatePost', async ({postId, updatedData}) => {
    console.log(postId, updatedData)
    const response = await axios.post(`http://localhost:3000/api/posts/edit/${postId}`, updatedData)
    console.log("Updated post : ",response.data)
    return response.data
})

// delete a post

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    const response = await axios.delete(`http://localhost:3000/api/user/posts/${postId}`)
    // console.log(response.data)
    return response.data
})

export const postSlice = createSlice({
    name : 'posts',
    initialState : {
        posts : [],
        status : 'idel',
        error : false
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(addPost.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.status = 'success'
            state.posts.push(action.payload)
        })
        .addCase(addPost.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(getAllPosts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.status = 'success'
            state.posts = action.payload
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(deletePost.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.status = 'success'
            state.posts = state.posts.filter((post) => post._id != action.payload._id)
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updatePost.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.status = 'success'
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            if (index !== -1) {
                state.posts[index] = action.payload
            }
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }

})

export default postSlice.reducer