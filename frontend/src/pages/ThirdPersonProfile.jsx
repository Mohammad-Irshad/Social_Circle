import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import Posts from '../components/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateUserData } from './features/usersSlice'

const ThirdPersonProfile = () => {

    const {thirdPersonId} = useParams()

    const {logedInUser, users} = useSelector((state) => state.users)
    const {posts} = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    const thirdPerson = users.find((user) => user._id === thirdPersonId)

    const userPosts = posts.filter((post) => post.userName === thirdPerson.userName)

    const handleFollow = (userId) => {

        const userToFollow = users.find((user) => user._id === thirdPersonId);
        const index = logedInUser.following.findIndex((id) => id === thirdPersonId);

        const follow = {
        following: index === -1
            ? [...logedInUser.following, thirdPersonId]
            : logedInUser.following.filter((id) => id !== thirdPersonId),
        };

        const userFollower = {
        followers: index === -1
            ? [...userToFollow.followers, logedInUser._id]
            : userToFollow.followers.filter((id) => id !== logedInUser._id),
        };

        dispatch(updateUserData({ userId: logedInUser._id, userData: follow }));
        dispatch(updateUserData({ userId: thirdPersonId, userData: userFollower }));
    }




  return (
    <>
      <Header/>
      <main className='container py-4 mb-5'>     

        <div className='row'>
            <div className='col-md-2' style={{position : 'fixed', marginTop : '40px'}}>
                <Sidebar user={logedInUser}/>
            </div>
            <div className='col-md-7' style={{marginTop : '50px', marginLeft : '16vw'}}>
                <div className='text-center'>
                    <img src={thirdPerson.userImage} alt='userImage'
                    className='img-fluid rounded-circle mb-3'
                    style={{"width" : "120px", "height" : "120px"}}
                    />
                    <h3>{thirdPerson.fullName}</h3>
                    <p>@{thirdPerson.userName}</p>
                    <button 
                        className={`btn ${logedInUser.following.includes(thirdPerson._id) ? 'btn-light border-dark' : 'btn-danger'}`}
                        onClick={() => handleFollow(thirdPerson._id)}>
                        {logedInUser.following.includes(thirdPerson._id) ? "Unfollow" : "Follow"}
                    </button><br/>
                    <br/>
                    <p className='text-center'>{thirdPerson.userBio}</p>
                    <p className='text-danger'>{thirdPerson.userWebsite ? thirdPerson.userWebsite : ''}</p>
                    <div className='card' style={{"border" : "none"}}>
                        <div className='card-body mx-5' >
                            <div className='row'>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{thirdPerson.following.length}</span>
                                    <p className='fw-normal'>Following</p>
                                </div>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{userPosts.length}</span>
                                    <p className='fw-normal'>Posts</p>
                                </div>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{thirdPerson.followers.length}</span>
                                    <p className='fw-normal'>Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Post */}
                <h4 className='fw-bold mb-3'>{thirdPerson.fullName}'s Posts</h4>
                <Posts posts={userPosts}/>
            </div>
            <div className='col-md-3' style={{position : 'fixed', marginTop : '50px', marginLeft : '66vw'}}>
                <SearchAndFollow users={users} />
            </div>
        </div>
      </main>
    </>
  )
}

export default ThirdPersonProfile
