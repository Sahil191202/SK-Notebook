import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import authContext from '../context/auth/AuthContext';
export default function Navbar() {
  const [input, setInput] = useState(false)
   const [password, setPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
  let history = useHistory();
  const handlelogout =()=>{
    localStorage.removeItem('token')
    history.push('/login')
    refClose.current.click()
  }
   const modal = () => {
     ref.current.click();
   };
   const ref = useRef(null);
   const refClose = useRef(null);
   const context = useContext(authContext);
  const { credentials, getUser, changePassword } = context;
  const [credential, setCredential] = useState({
    id:"",
    epassword:""
  })
   const handlechangepass = (e) => {
    e.preventDefault();
    changePassword(credential.id,credential.password);
   }
   const handlechange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  useEffect(() => {
      getUser();
    // eslint-disable-next-line
  }, []);
  const Changepass = () =>{
    setInput(!input)
  
  }
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
                    src={credentials.profile}
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
                  <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Profile
                    </h5>
                    <button
                      type="button"
                      ref={refClose}
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    class="modal-body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={credentials.profile}
                      class="rounded-circle"
                      style={{
                        width: "100px",
                      }}
                      alt="Avatar"
                    />
                    <h3>{credentials.name}</h3>
                    <h3>{credentials.email}</h3>
                    {input ?     (<div>
      <h2>Change Password</h2>
      <form onSubmit={handlechangepass}>
        <label>
          Old Password:
          <input
          id='epassword'
          name='epassword'
            type="password"
            onChange={handlechange}
          />
        </label>
        <label>
          New Password:
          <input
          name='epassword'
            type="password"
            onChange={handlechange}
          />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
):("")}
                  </div>
                  <div class="modal-footer">
                    {!localStorage.getItem("token") ? (
                      <form className="d-flex"></form>
                    ) : (
                      <button onClick={Changepass} className="btn btn-primary">
                        ChangePassword
                      </button>
                    )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}