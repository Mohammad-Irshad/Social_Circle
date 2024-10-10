import React from 'react'

const Header = () => {
  return (
    <header>
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand fw-medium fs-4" href="#">
                {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" /> */}
                Social_<span className='text-danger'>Circle &#9675;</span>
                </a>
            </div>
        </nav>
    </header>
  )
}

export default Header
