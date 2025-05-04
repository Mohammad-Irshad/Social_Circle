import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import Posts from '../components/Posts'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaSort } from 'react-icons/fa'

const Explore = () => {


  const [sortedPosts, setSortedPosts] = useState(null)
  const [filteredPost, setFilteredPosts] = useState([])

  const { logedInUser, users } = useSelector((state) => state.users)
  const { posts, status } = useSelector((state) => state.posts)

  const handleSort = (sortValue) => {
    let sorted;
    if (sortValue === 'Newest First') {
      sorted = [...filteredPost].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else {
      sorted = [...filteredPost].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    setSortedPosts(sorted)
  }

  const handleFilter = (filterValue) => {
    let filtered;
    switch (filterValue) {
      case 'All':
        filtered = [...posts]
        break;
      case 'Trending':
        filtered = posts.filter(post => post.postLikes && post.postLikes > 0)
        filtered.sort((a, b) => b.postLikes - a.postLikes)
        break;
      default:
        filtered = [...posts]
        break;
    }
    setFilteredPosts(filtered)
  }

  useEffect(() => {
    handleFilter('All')
  }, [posts])

  useEffect(() => {
    handleSort("Oldest First")
  }, [filteredPost])

  return (
    <>
      <Header />
      <main className='container py-4 mb-5'>
        <div className='row'>
          <div className='col-md-2' style={{ marginTop: '40px', position: 'fixed' }}>
            <Sidebar user={logedInUser} />
          </div>
          <div className='col-md-7' style={{ marginTop: '50px', marginLeft: '16vw' }}>
            <div className='row'>
              <div className='col-md-8'>
                <h3>Explore</h3>
              </div>
              <div className='col-md-4 d-flex align-items-center'>
                <p className='mb-0 me-2'>Sort By :</p>
                <select className='form-select form-select-sm w-auto' onChange={(e) => handleSort(e.target.value)}>
                  <option value={"Oldest First"}>Oldest First</option>
                  <option value={"Newest First"}>Newest First</option>
                </select>
              </div>
            </div>

            <div className='py-3 d-flex justify-content-start '>
              <button className='btn btn-light border-dark' value={"All"} onClick={(e) => handleFilter(e.target.value)}>All</button>
              <button className='btn btn-light border-dark ms-4' value={"Trending"} onClick={(e) => handleFilter(e.target.value)}>Trending</button>
              {/* <button className='btn btn-light border-dark' value={"Technolgoy"} >Technolgoy</button>
                    <button className='btn btn-light border-dark' value={"Sports"} >Sports</button>
                    <button className='btn btn-light border-dark' value={"News"} >News</button> */}
            </div>
            <div></div>
            {status === 'idle' ? <p>Loading...</p> : <Posts posts={sortedPosts || posts} />}

          </div>
          <div className='col-md-3' style={{ marginTop: '50px', position: 'fixed', right: '0' }}>
            <SearchAndFollow users={users} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Explore
