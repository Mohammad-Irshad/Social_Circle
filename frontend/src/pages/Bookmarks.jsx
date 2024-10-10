import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import Posts from '../components/Posts'
import { useSelector } from 'react-redux'

const Bookmarks = () => {

  const {logedInUser, users} = useSelector((state) => state.users)
  const {posts} = useSelector((state) => state.posts)

  const userBookMarkedPosts = posts.filter((post) => logedInUser.bookmarkPosts.includes(post._id))
  console.log(userBookMarkedPosts)
  return (
    <>
     <Header/>
     <main className='container py-4 mb-5'>
        <div className='row'>
            <div className='col-md-2'>
              <Sidebar user={logedInUser}/>
            </div>
            <div className='col-md-7'>
                <h3>Your Bookmarks</h3>
                <Posts posts={userBookMarkedPosts}/>
            </div>
            <div className='col-md-3'>
                <SearchAndFollow users={users}/>
            </div>
        </div>
     </main> 
    </>
  )
}

export default Bookmarks
