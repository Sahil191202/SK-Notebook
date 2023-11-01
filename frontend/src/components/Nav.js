import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import authContext from "../context/auth/AuthContext";
import Navbar from './Navbar';

const Nav = () => {
     const context = useContext(authContext);
     const { credentials, getUser } = context;
     useEffect(() => {
       getUser();
       // eslint-disable-next-line
     }, []);
      const modal = () => {
        ref.current.click();
      };
      const ref = useRef(null);
      const refClose = useRef(null);
    const [navbar, setNavbar] = useState(true);
      const handlenavbar = () => {
        setNavbar(!navbar);
      };

      const className = navbar
        // ? 'collapse navbar-collapse'
        ? "collapse navbar-collapse ".replace("show"  , "")
        : 'collapse navbar-collapse'.replace("show", "")
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="sklogo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={navbar && "#navbarSupportedContent"}
            aria-controls="navbarSupportedContent"
            aria-expanded=""
            aria-label=""
          >
            <span className="navbar-toggler-icon" onClick={handlenavbar}></span>
          </button>
          <div className={className} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={handlenavbar}
                  >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/notes"
                  onClick={handlenavbar}
                  >
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/video"
                  onClick={handlenavbar}
                  >
                  Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/images"
                  onClick={handlenavbar}
                  >
                  Images
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/pdf"
                  onClick={handlenavbar}
                  >
                  Pdf's
                </Link>
              </li>
            </ul>
            <Navbar />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav
