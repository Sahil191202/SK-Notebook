import React, { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup() {
    const refotp = useRef(null);
    const refCloseotp = useRef(null);
    const modal = () => {
      refotp.current.click();
    };
  const [isloading, setIsloading] = useState(false);
  const [isloadingotp, setIsloadingotp] = useState(false);
  const [pic, setPic] = useState();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
    otp: "",
  });
  let history = useHistory();
  const handleclick = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const response = await fetch(
      "https://your-notes-by-sk.onrender.com/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          profile: localStorage.getItem("profile"),
          otp: credentials.otp,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/notes");
      setIsloading(false);
      window.location.reload();
      alert("Signed Up SucessFully");
    }
  };

  const handlechange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("enter image");
      return;
    }
    setIsloading(true);
    console.log(pics);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "skdrive");
      data.append("cloud_name", "dvilwjvzj");
      fetch("https://api.cloudinary.com/v1_1/dvilwjvzj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          const Picture = data.url.toString();
          localStorage.setItem("profile", Picture);
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsloading(false);
        });
    } else {
      alert("Enter Image");
      setIsloading(false);
      return;
    }
  };
  const handleSendOTP = async () => {
    setIsloadingotp(true);
    const response = await fetch(
      "https://your-notes-by-sk.onrender.com/api/auth/sendotp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.success) {
      alert("OTP sent successfully");
      setIsloadingotp(false);
    } else {
      alert("Enter Email ID");
      setIsloadingotp(false);
    }
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputname1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handlechange}
              id="exampleInputname1"
              aria-describedby="nameHelp"
            />
            <div id="nameHelp" className="form-text">
              Choose A Unique name For YourSelf.
            </div>
          </div>
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
              type="password"
              name="password"
              onChange={handlechange}
              className="form-control"
              id="exampleInputPassword1"
            />
            <div id="passwordHelp" className="form-text">
              Your Password is Always Safe With Us.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="profile"
              id="profile"
              style={{ paddingTop: ".3em", paddingLeft: "1.3em" }}
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <div id="passwordHelp" className="form-text">
              Choose A Beautiful Image For Yourself.
            </div>
          </div>
          <a
            onClick={modal}
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#F21401",
              border: "none",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            Next
          </a>
        </form>
      </div>

      <button
        type="button"
        ref={refotp}
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal4"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal4"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content" style={{ backgroundColor: "#051010" }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                OTP Verification
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                style={{ color: "black", outline: "none" }}
                type="text"
                name="otp"
                placeholder="OTP"
                value={credentials.otp}
                onChange={handlechange}
              />
              &nbsp;&nbsp;
              <a
                className="btn btn-primary"
                onClick={handleSendOTP}
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: "13px",
                  backgroundColor: "#F21401",
                }}
              >
                {isloadingotp ? (
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </a>
            </div>
            <div class="modal-footer">
              <button
                onClick={handleclick}
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#F21401",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "20px",
                }}
                disabled={
                  credentials.password.length < 8 ||
                  credentials.otp.length < 5 ||
                  isloading
                }
              >
                {isloading ? (
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
