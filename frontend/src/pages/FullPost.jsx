import React, { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Posts from '../components/Posts'
import { getAllPosts } from './features/postSlice'

const FullPost = () => {
    const {postId} = useParams()
    console.log(postId)

    const dispatch = useDispatch()

    const {logedInUser, users} = useSelector((state) => state.users)
    const {posts, status} = useSelector((state) => state.posts)
    const post = posts.filter((post) => post._id === postId)

    

  return (
    <>
      <Header/>
      <main className='container py-4 mb-5'>
      {status === "success" && console.log(post)}
        <div className='row'>
            <div className='col-md-2' style={{marginTop : '40px', position : 'fixed'}}>
                <Sidebar user={logedInUser} />
            </div>
            <div className='col-md-6' style={{marginTop : '50px', position : 'fixed', marginLeft : '16vw'}}>
                <Link to={'/home'}> <FaArrowLeft/></Link><span className='fw-medium fs-4 ms-4'>Post</span><br/><br/>
                <Posts posts={post} showComments={true} thePostId={postId} />
            </div>
            <div className='col-md-3' style={{marginTop : '50px', position : 'fixed', marginLeft : '66vw'}}>
                <SearchAndFollow users={users}/>
            </div>
        </div>
      </main>
    </>
  )
}

export default FullPost
