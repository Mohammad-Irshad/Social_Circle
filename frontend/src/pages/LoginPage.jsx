import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addLogInUser, fetchUsers } from './features/usersSlice'


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUsers())
    },[])

    const handleLogin = (e) => {
        e.preventDefault()
        // console.log(users)
        const user = users.find((user) => (user.userEmail === email && user.userPassword === password))
        // console.log(user)
        if(user){
            dispatch(addLogInUser(user))
            navigate('/home')
        }else{
            setShowMessage(true)
        }

    }

  return (
    <>
      <main>        
        <div className='m-5 p-5'>
            <div className='text-center'>
                <p>
                    <span className='fs-1 fw-bold'> Social_</span>
                    <span className='fs-1 fw-bold text-danger'>Circle &#9675;</span>
                </p>
            </div>
            
            <div className="card" style={{maxWidth : '500px', margin : 'auto'}}>
                <div className="card-body">
                    <h1 className='text-center'>Login</h1>
                    <br/>
                    <form className='mx-5'>
                        <label className='form-label'>Email Address</label>
                        <input 
                        type='text'
                        className='form-control'
                        placeholder='example@gmail.com' 
                        onChange={(e) => setEmail(e.target.value)}                       
                        />
                        <br/>
                        <label className='form-label'>Password</label>
                        <input 
                        type='text'
                        className='form-control'
                        placeholder='************'      
                        onChange={(e) => setPassword(e.target.value)}                  
                        />
                        <br/>
                        {showMessage && <p className='text-danger'>User not found signUp for login!</p>}
                        <div className='d-flex justify-content-between'>
                            <div>
                                <input                                
                                id='remember'
                                type='checkbox'                                
                                />
                                <label htmlFor='remember' className='ms-2'>                                
                                Remember Me
                                </label>
                            </div>                            
                            <a className='style-none'>
                                Forgor your password?
                            </a>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button 
                              type='submit' 
                              className='btn btn-danger'
                              onClick={(e) => handleLogin(e)}
                            >Log In</button>
                          </div>
                    </form>                    
                </div>
                <Link className='text-center pb-2' style={{"textDecoration" : "none"}} to='/signUp'>Create New Account &gt; </Link>
            </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
