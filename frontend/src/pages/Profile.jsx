import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import Posts from '../components/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, updateUserData } from './features/usersSlice'

const Profile = () => {

    const [avatar, setAvatar] = useState()
    const [bio, setBio] = useState()
    const [website, setWebsite] = useState()

    const {logedInUser, users} = useSelector((state) => state.users)
    const {posts} = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    const userPosts = posts.filter((post) => post.userName === logedInUser.userName)

    const avatars = [
        'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1724662234~exp=1724665834~hmac=435dd70b32b8a3c8266b2f267fa9434dd2756ea1e9e06aaa8c655b08a93067b5&w=740',
        'https://img.freepik.com/premium-photo/man-with-beard-glasses-is-wearing-jacket-that-says-hes-wearing-jacket_113255-93084.jpg?w=740',
        'https://img.freepik.com/premium-photo/avatar-resourcing-company_1254967-6696.jpg?w=740',
        'https://img.freepik.com/free-vector/smiling-woman-with-black-hair_1308-171452.jpg?t=st=1724673498~exp=1724677098~hmac=7eb376fc9648972a4f9caf8ad7442681d03c4f77743624ebf3d9bb4955087531&w=740',
        'https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-92265.jpg?w=740'
    ]

    const handleUpdate = () => {        
        console.log(avatar)
        console.log(bio)
        console.log(website)
        const updatedData = {};

        if (avatar) {
            updatedData.userImage = avatar;
        }
        if (bio) {
            updatedData.userBio = bio;
        }
        if (website) {
            updatedData.userWebsite = website;
        }

        // Check if there is any data to update
        if (Object.keys(updatedData).length > 0) {
            dispatch(updateUserData({userId: logedInUser._id, userData: updatedData}));
        } else {
            console.log("No data to update");
        }
    }



  return (
    <>
      <Header/>
      <main className='container py-4 mb-5'>
        <div className='row'>
            <div className='col-md-2'>
                <Sidebar user={logedInUser}/>
            </div>
            <div className='col-md-7'>               
                
                
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <h6>Choose an <i>AVATAR</i></h6>
                            <div className='row'>
                                {avatars.map((avt) => (
                                    <div className='col-md'>
                                        <img src={avt} alt='userImage'
                                        className={`img-fluid rounded-circle mb-3 ${avatar === avt ? 'border border-primary' : ''}`}
                                        style={{"width" : "90px", "height" : "80px", cursor : "pointer"}}
                                        onClick={() => setAvatar(avt)}                                        
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h6>Update Bio</h6>
                            <textarea className='form-control' placeholder='write bio...' onChange={(e) => setBio(e.target.value)}></textarea><br/>
                            <h6>Add/Update Website</h6>
                            <input className='form-control' placeholder='example@mail.com' onChange={(e) => setWebsite(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>



                <div className='text-center'>
                    <img src={logedInUser.userImage} alt='userImage'
                    className='img-fluid rounded-circle mb-3'
                    style={{"width" : "120px", "height" : "120px"}}
                    />
                    <h3>{logedInUser.fullName}</h3>
                    <p>@{logedInUser.userName}</p>
                    {/* <button className='btn btn-light border-dark'>Edit Profile</button><br/> */}
                    <button type="button" className="btn btn-light border-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Profile
                    </button>
                    <br/>
                    <p className='text-center mt-3'>{logedInUser.userBio}</p>
                    <p className='text-danger'>{logedInUser.userWebsite ? "logedInUser.userWebsite" : ''}</p>
                    <div className='card' style={{"border" : "none"}}>
                        <div className='card-body mx-5' >
                            <div className='row'>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{logedInUser.following.length}</span>
                                    <p className='fw-normal'>Following</p>
                                </div>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{userPosts.length}</span>
                                    <p className='fw-normal'>Posts</p>
                                </div>
                                <div className='col-md-4'>
                                    <span className='fw-bold'>{logedInUser.followers.length}</span>
                                    <p className='fw-normal'>Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Post */}
                <h4 className='fw-bold mb-3'>Your Posts</h4>
                <Posts posts={userPosts}/>
            </div>
            <div className='col-md-3'>
                <SearchAndFollow users={users} />
            </div>
        </div>
      </main>
    </>
  )
}

export default Profile
