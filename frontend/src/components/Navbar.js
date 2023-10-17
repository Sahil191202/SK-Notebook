import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default function Navbar() {
  let history = useHistory();
  const handlelogout =()=>{
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">SK DRIVE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">Notes</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')? <form className="d-flex">
            </form>: <button onClick={handlelogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}