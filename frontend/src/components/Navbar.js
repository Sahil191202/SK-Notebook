import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default function Navbar() {
  let history = useHistory();
  const handlelogout =()=>{
    localStorage.removeItem('token')
    history.push('/login')
  }
   const modal = () => {
     ref.current.click();
   };
   const ref = useRef(null);
   const refClose = useRef(null);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            SK DRIVE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/video">
                  Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/images">
                  Images
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pdf">
                  Pdf's
                </Link>
              </li>
            </ul>
            <nav class="navbar navbar-light bg-light">
              <div class="container-fluid">
                <a class="navbar-brand">Navbar</a>
                <form class="d-flex">
                  <img
                    onClick={modal}
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    class="rounded-circle"
                    style={{ width: "50px" }}
                    alt="Avatar"
                  />
                </form>
              </div>
            </nav>

            <button
              type="button"
              ref={ref}
              class="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              Launch demo modal
            </button>

            <div
              class="modal fade"
              id="exampleModal1"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      ref={refClose}
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Close
                    </button>
                  </div>
                  <div
                    class="modal-body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      class="rounded-circle"
                      style={{
                        width: "100px",
                      }}
                      alt="Avatar"
                    />
                    {!localStorage.getItem("token") ? (
                      <form className="d-flex"></form>
                    ) : (
                      <button
                        onClick={handlelogout}
                        className="btn btn-primary"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}