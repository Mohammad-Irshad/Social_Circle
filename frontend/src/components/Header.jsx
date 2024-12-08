import React from 'react'

const Header = () => {
  return (
    <header style={{position : 'fixed', width: '100%'}}>
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand fw-medium fs-4" href="#">
                Social_<span className='text-danger'>Circle &#9675;</span>
                </a>
            </div>
        </nav>
    </header>
  )
}

export default Header
