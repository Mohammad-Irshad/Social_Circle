import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// register user

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
    const response = await axios.post('https://social-media-appbackend.vercel.app/api/registerUser', newUser)
    return response.data
})

// fetch users

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://social-media-appbackend.vercel.app/api/users')
    return response.data
})

// update userData

export const updateUserData = createAsyncThunk('users/updateUserData', async ({userId, userData}) => {
    const response = await axios.post(`https://social-media-appbackend.vercel.app/api/user/updateData/${userId}`, userData)
    return response.data
})


export const usersSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        logedInUser : {},
        status : 'idle',
        error : false
    },
    reducers : {
         addLogInUser : (state, action) => {
            state.logedInUser = action.payload
         }
    },
    extraReducers : (builder) => {
        builder
        .addCase(addUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.status = 'success'
            state.users.push(action.payload)
        })
        .addCase(addUser.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = "success"
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        .addCase(updateUserData.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            state.status = 'success'
            const { _id : userId } = action.payload;

            if (userId === state.logedInUser._id) {
                state.logedInUser = action.payload
            } else {
                const userIndex = state.users.findIndex(user => user._id === userId);
                if (userIndex !== -1) {
                    state.users[userIndex] = action.payload
                }
            }
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
    }
})

export const {addLogInUser} = usersSlice.actions



export default usersSlice.reducer


