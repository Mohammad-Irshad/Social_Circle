import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUserData } from '../pages/features/usersSlice'

const SearchAndFollow = ({users}) => {

  const [userSearch, setUserSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState([])

  const {logedInUser} = useSelector((state) => state.users)
  const dispatch = useDispatch()
  

  const handleFollow = (thirdPersonId) => {

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

  const handleSearch = (e) => {

    if(userSearch.trim() != ''){
      const searchedUsers = users.filter((user) => user.fullName.toLowerCase().includes(userSearch.toLowerCase()))
      setFoundUsers(searchedUsers)
    }else{
      setFoundUsers([])
    }
  }

  const handleShowAll = () => {
    setFoundUsers([])
    setUserSearch('')
  }


  return (
    <div>
      <div className="input-group">
        <span className="input-group-text">
            <FaSearch onClick={handleSearch} style={{cursor: 'pointer'}}/>
        </span>
        <input 
            type="text" 
            placeholder="search user" 
            className="form-control" 
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
        />                
        </div>

        <br/>

        <div className="card" style={{"width" : "auto"}}>
        <div className="card-body">
            <div className='d-flex justify-content-between fw-medium'>
            <h6>Who to follow?</h6>
            <h6 className='text-danger' onClick={handleShowAll} style={{cursor : 'pointer'}}>{foundUsers.length > 0 ? 'Show All' : ''}</h6>
            </div>
            <hr/>
            <div className='row'>
              {(foundUsers.length > 0 ? foundUsers : users ).map((user) => (
                <React.Fragment key={user._id}>                
                  <div  className='col-md-3'>
                  <img src={`${user.userImage ? user.userImage : 'https://img.freepik.com/premium-photo/lego-figure-boy-wearing-glasses-jacket-with-hood_113255-94249.jpg?size=626&ext=jpg&ga=GA1.1.975262890.1723114701&semt=ais_hybrid'}`}
              alt='userImage' className='img-fluid rounded-circle' />
                  </div>
                  <div className='col-md-5'>
                    <Link to={`/home/${user._id}`} style={{textDecoration : "none"}}>
                      <span className='fw-medium'>{user.fullName}</span>
                      <p>@{user.userName}</p>
                    </Link>
                  </div>
                  <div className='col-md-4'>
                    <p 
                    className='text-danger fw-bold' 
                    onClick={() => handleFollow(user._id)} 
                    style={{cursor : "pointer"}}>
                      {logedInUser.following.includes(user._id) ? "Unfollow" : "Follow +"}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default SearchAndFollow
