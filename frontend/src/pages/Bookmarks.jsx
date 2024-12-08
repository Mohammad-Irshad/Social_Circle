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
  return (
    <>
     <Header/>
     <main className='container py-4 mb-5'>
        <div className='row'>
            <div className='col-md-2' style={{marginTop : '40px', position : 'fixed'}}>
              <Sidebar user={logedInUser}/>
            </div>
            <div className='col-md-7' style={{marginTop : '50px', marginLeft : '16vw'}}>
                <h3>Your Bookmarks</h3>
                {userBookMarkedPosts.length > 0 ? <Posts posts={userBookMarkedPosts}/> : <p>You did not bookmark a post yet!</p>}
                
            </div>
            <div className='col-md-3' style={{marginTop : '50px', position : 'fixed', marginLeft : '66vw'}}>
                <SearchAndFollow users={users}/>
            </div>
        </div>
     </main> 
    </>
  )
}

export default Bookmarks
