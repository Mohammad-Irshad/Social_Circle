import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addUser, fetchUsers } from './features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignUp = () => {

  const [emailMessage, setEmailMessage] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState(false)
  const [showAfterRegistration, setShowAfterRegistration] = useState(false)
  const [fillDetailsMessage, setFillDetailsMessage] = useState(false)

  const [fullName, setFullName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])



  const submitHandler = (e) => {
    e.preventDefault()

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setFillDetailsMessage(true)
      return
    } else {
      setFillDetailsMessage(false)
    }


    const newUser = {
      fullName: fullName,
      userName: username,
      userEmail: email,
      userPassword: password,
      userConfirmPassword: confirmPassword
    }



    const isAlreadyRegistered = users.find((user) => user.userEmail === email)
    const isUsernameUsed = users.find(user => user.userName === username)

    if (isUsernameUsed) {
      setUsernameMessage(true)
    } else if (isAlreadyRegistered) {
      setEmailMessage(true)
    } else {
      dispatch(addUser(newUser))
      setShowAfterRegistration(true)
      setFullName('')
      setUserName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }




  return (
    <>
      <main>
        <div className='' >
          <div className='text-center '>
            <p>
              <span className='fs-1 fw-bold'> Social_</span>
              <span className='fs-1 fw-bold text-danger'>Circle &#9675;</span>

            </p>
          </div>

          <div className=''>
            <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
              <div className="card-body">
                <h2 className='text-center'>Signup</h2>
                {/* <br/> */}
                {fillDetailsMessage ? <p style={{ textAlign: 'center', color: 'red' }}>Please fill All the details.</p> : null}
                {showAfterRegistration ? <p style={{ textAlign: 'center', color: 'green' }}>User Registered successfully! Go to the login page.</p> : null}
                <form className='mx-5'>
                  <label className='form-label'>Full Name</label>
                  <input
                    type='text'
                    required
                    value={fullName}
                    className='form-control'
                    placeholder='Enter Name'
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {/* <br/> */}
                  <label className='form-label mt-3'>Username</label>
                  <input
                    type='text'
                    required
                    value={username}
                    className='form-control'
                    placeholder='Enter User Name'
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {/* <br/> */}
                  {usernameMessage && <p className='text-danger'>Username is not available try a different username</p>}
                  <label className='form-label mt-3'>Email Address</label>
                  <input
                    type='text'
                    value={email}
                    required
                    className='form-control'
                    placeholder='Enter Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <br/> */}
                  {emailMessage && <p className='text-danger'>This email address is already registered! Go to login page</p>}
                  <label className='form-label mt-3'>Password</label>
                  <input
                    type='text'
                    value={password}
                    required
                    className='form-control'
                    placeholder='************'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <br/> */}
                  <label className='form-label mt-3'>Confirm Password</label>
                  <input
                    type='text'
                    value={confirmPassword}
                    required
                    className='form-control mb-3'
                    placeholder='************'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {/* <div>
                              <input                                
                              id='remember'
                              type='checkbox'   
                              onChange={() => setRememberMe(!rememberMe)}                             
                              />
                              <label htmlFor='remember' className='ms-2'>                                
                              Remember Me
                              </label>
                          </div> */}
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type='submit'
                      className='btn btn-danger'
                      onClick={(e) => submitHandler(e)}
                    >Create New Account</button>
                  </div>
                </form>
              </div>
              <Link className='text-center pb-2' style={{ "textDecoration": "none" }} to='/logIn'>Alredy have an Account &gt; </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignUp
