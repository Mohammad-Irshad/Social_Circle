import {configureStore} from '@reduxjs/toolkit'
import usersSlice from '../pages/features/usersSlice'
import postSlice from '../pages/features/postSlice'

export default configureStore({
    reducer : {
        users : usersSlice,
        posts : postSlice
    }
})