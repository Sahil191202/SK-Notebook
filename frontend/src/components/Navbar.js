import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import authContext from '../context/auth/AuthContext';
import Nav from './Nav';
export default function Navbar() {
  const [input, setInput] = useState(false)
   const [password, setPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
  let history = useHistory();
  const handlelogout =()=>{
    localStorage.removeItem('token')
    history.push('/home')
    refClose.current.click()
    window.location.reload()
  }
  const handleselect =()=>{
    history.push('/select')
    refClose.current.click()
  }
   const modal = () => {
     ref.current.click();
   };
   const ref = useRef(null);
   const refClose = useRef(null);
   const context = useContext(authContext);
  const { credentials, getUser } = context;
  useEffect(() => {
      getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <nav class="navbar navbar-dark">
        {localStorage.getItem("token") ? (
          <div>
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
        ):""}
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
          <div class="modal-content" style={{ backgroundColor: "#051010" }}>
            <div class="modal-header ">
              <h5 class="modal-title" id="exampleModalLabel">
                Profile
              </h5>
              <button
                style={{ backgroundColor: "#F21401" }}
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
              {input ? (
                <div>
                  <h2>Change Password</h2>
                  <form>
                    <label>
                      Old Password:
                      <input id="epassword" name="epassword" type="password" />
                    </label>
                    <label>
                      New Password:
                      <input name="epassword" type="password" />
                    </label>
                    <button type="submit">Change Password</button>
                  </form>
                </div>
              ) : (
                ""
              )}
            </div>
            <div class="modal-footer">
              {!localStorage.getItem("token") ? (
                <form className="d-flex"></form>
              ) : (
                <button
                  style={{
                    backgroundColor: "#F21401",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="btn btn-primary"
                  onClick={handleselect}
                >
                  Home
                </button>
              )}
              {!localStorage.getItem("token") ? (
                <form className="d-flex"></form>
              ) : (
                <button
                  style={{
                    backgroundColor: "#F21401",
                    border: "none",
                    borderRadius: "5px",
                  }}
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
    </>
  );
}