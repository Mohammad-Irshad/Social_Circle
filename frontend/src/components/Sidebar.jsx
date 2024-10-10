import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaHome, FaCompass, FaBookmark, FaUser } from 'react-icons/fa';

const Sidebar = ({user}) => {
  // console.log(user)
  return (
    <>
      <main className="d-flex flex-column min-vh-100">
        <nav className="nav flex-column">       
            {/* <NavLink className='nav-link text-black' to='/home'>
            <FaHome size={20} color="red" /> Home </NavLink> */}
            {/* <NavLink className='nav-link text-black' to='/explore'>
            <FaCompass size={20} color="red" /> Explore</NavLink> */}
            <NavLink 
                className={({ isActive }) => isActive ? 'nav-link text-danger  fw-medium fst-italic' : 'nav-link text-black'} 
                to='/home'>
                <FaHome size={20} color="red" /> Home
            </NavLink>
            <NavLink 
                className={({ isActive }) => isActive ? 'nav-link text-danger active fw-medium fst-italic' : 'nav-link text-black'} 
                to='/explore'>
                <FaCompass size={20} color="red" /> Explore
            </NavLink>
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link text-danger active fw-medium fst-italic' : 'nav-link text-black'}
              to='/bookmarks'>
            <FaBookmark size={20} color="red" /> Bookmark</NavLink>
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link text-danger active fw-medium fst-italic' : 'nav-link text-black'}
              to='/profile'>
            <FaUser size={20} color="red" /> Profile</NavLink>
        </nav>
        <Link style={{"textDecoration" : "none"}} to={'/home'}>
            <div className='mt-3 mb-5 text-center bg-danger py-2 text-white rounded'>
                Create New Post
            </div>
        </Link>      
        <div className="mt-5">
          <div className='row mt-5'>
            <div className='col-md-4'>
              <img src={user.userImage}
              alt='userImage' className='img-fluid rounded-circle' />
            </div>
            <div className='col-md-6'>
              <span className='fw-medium'>{user.fullName}</span>
              <p>@{user.userName}</p>
            </div>
            <div className='col-md-2'>...</div>
          </div>
        </div>  
      </main>
    </>
  )
}

export default Sidebar
