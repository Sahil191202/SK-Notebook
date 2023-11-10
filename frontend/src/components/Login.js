import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);
  const showhide = () => {
    setShow(!show);
  };
  const [credentials, setcredentials] = useState("");
  const [isloading, setIsloading] = useState(false);
  let history = useHistory();
  const handleclick = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("uid", json.uid);
      history.push("/select");
      setIsloading(false);
      window.location.reload();
    } else {
      setIsloading(false);
      alert("Invaild Credentials Entered");
    }
  };

  const handlechange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleclick}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handlechange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              onChange={handlechange}
              className="form-control"
              id="exampleInputPassword1"
            />
            <div id="passwordHelp" className="form-text">
              Your Password is Always Safe With Us.
            </div>
          </div>

          <button
            style={{
              backgroundColor: "#F21401",
              border: "none",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            type="submit"
            disabled={isloading}
            className="btn btn-primary"
          >
            {isloading ? (
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div style={{}}>
          <img style={{ maxHeight: "220px" }} src="sklogin.png" alt="" />
        </div>
      </div>
    </>
  );
}
export default Login;
