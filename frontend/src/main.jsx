import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Bookmarks from './pages/Bookmarks.jsx'
import Explore from './pages/Explore.jsx'
import store from './app/store.js'
import { Provider } from 'react-redux'
import ThirdPersonProfile from './pages/ThirdPersonProfile.jsx'
import FullPost from './pages/FullPost.jsx'


const router = createBrowserRouter([  
  {
    path : '/',
    element : <App/>
  },
  {
    path : '/logIn',
    element : <LoginPage/>
  },
  {
    path : '/signUp',
    element : <SignUp/>
  },
  {
    path : '/home',
    element : <Home/>
  },
  {
    path : '/profile',
    element : <Profile/>
  },
  {
    path : '/bookmarks',
    element : <Bookmarks/>
  },
  {
    path : '/explore',
    element : <Explore/>
  },
  {
    path : '/home/:thirdPersonId',
    element : <ThirdPersonProfile/>
  },
  {
    path : '/post/:postId',
    element : <FullPost/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>    
    </Provider>
  // {/* </React.StrictMode>, */}
)
