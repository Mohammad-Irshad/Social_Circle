import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// add a post 
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post('https://social-media-appbackend.vercel.app/api/user/post', newPost)
    return response.data
})

// get all the posts

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    const response = await axios.get('https://social-media-appbackend.vercel.app/api/posts')
    return response.data
})

// updated a post

export const updatePost = createAsyncThunk('posts/updatePost', async ({postId, updatedData}) => {
    const response = await axios.post(`https://social-media-appbackend.vercel.app/api/posts/edit/${postId}`, updatedData)
    return response.data
})

// delete a post

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    const response = await axios.delete(`https://social-media-appbackend.vercel.app/api/user/posts/${postId}`)
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
        updateLikes : (state, action) => {
            let indexOfLikedPost = state.posts.findIndex((post) => post._id === action.payload.postId)
            state.posts[indexOfLikedPost] = {...state.posts[indexOfLikedPost], postLikes : action.payload.updatedData.postLikes}
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(addPost.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.status = 'success'
            state.posts.unshift(action.payload)
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

export const {updateLikes} = postSlice.actions

export default postSlice.reducer
