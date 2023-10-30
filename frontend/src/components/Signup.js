import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup() {
  const [isloading, setIsloading] = useState(false);
  const [pic, setPic] = useState();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    profile:"",
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
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/notes");
      setIsloading(false);
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

  return (
    <>
      <div className="container">
        <form onSubmit={handleclick}>
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
            <label htmlFor="exampleInputPassword1" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="contact-inp2"
              accept="image/*"
              name="profile"
              id="profile"
              style={{ paddingTop: ".3em", paddingLeft: "1.3em" }}
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
          <img src={credentials.profile} alt="pp" />
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {isloading ? (
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
export default Signup;
