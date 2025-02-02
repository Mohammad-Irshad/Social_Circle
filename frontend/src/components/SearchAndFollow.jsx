import React, { useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUserData } from '../pages/features/usersSlice'

const SearchAndFollow = ({ users }) => {

  const [foundUsers, setFoundUsers] = useState([])
  const inputRef = useRef(null)

  const { logedInUser } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const allUsers = users.filter((user) => user._id != logedInUser._id)


  const handleFollow = (thirdPersonId) => {

    const userToFollow = allUsers.find((user) => user._id === thirdPersonId);
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
    let userSearch = e.target.value
    if (userSearch.trim() != '') {
      const searchedUsers = allUsers.filter((user) => user.fullName.toLowerCase().includes(userSearch.toLowerCase()))
      setFoundUsers(searchedUsers)
    } else {
      setFoundUsers([])
    }
  }

  const handleShowAll = () => {
    setFoundUsers([])
    console.log(inputRef)
    inputRef.current.value = null
  }


  return (
    <div>
      <div className="input-group">
        <span className="input-group-text">
          <FaSearch onClick={handleSearch} style={{ cursor: 'pointer' }} />
        </span>
        <input
          type="text"
          placeholder="search user"
          className="form-control"
          ref={inputRef}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <br />

      <div className="card" style={{ "width": "auto" }}>
        <div className="card-body">
          <div className='d-flex justify-content-between fw-medium'>
            <h6>Who to follow?</h6>
            <h6 className='text-danger' onClick={handleShowAll} style={{ cursor: 'pointer' }}>{foundUsers.length > 0 ? 'Show All' : ''}</h6>
          </div>
          <hr />
          <div className='row' style={{ maxHeight: "400px", overflowY: "auto" }}>
            {(foundUsers.length > 0 ? foundUsers : allUsers).map((user) => (
              <React.Fragment key={user._id}>
                <div className='col-md-3 my-1'>
                  <img src={`${user.userImage ? user.userImage : 'https://img.freepik.com/premium-photo/lego-figure-boy-wearing-glasses-jacket-with-hood_113255-94249.jpg?size=626&ext=jpg&ga=GA1.1.975262890.1723114701&semt=ais_hybrid'}`}
                    alt='userImage' className='img-fluid rounded-circle' />
                </div>
                <div className='col-md-5'>
                  <Link to={`/home/${user._id}`} style={{ textDecoration: "none" }}>
                    <span className='fw-medium'>{user.fullName}</span>
                    <p>@{user.userName}</p>
                  </Link>
                </div>
                <div className='col-md-4'>
                  <p
                    className={`fw-bold ${logedInUser.following.includes(user._id) ? 'text-primary' : 'text-danger'}`}
                    onClick={() => handleFollow(user._id)}
                    style={{ cursor: "pointer" }}>
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
