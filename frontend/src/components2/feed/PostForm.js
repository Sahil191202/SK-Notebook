import React, { useState } from "react";
import PostList from "./PostList";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function PostForm() {
  const userid = localStorage.getItem("uid");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [pic, setPic] = useState();
  const [input, setInput] = useState({
    user: "",
    desc: "",
    img: "",
    userid: localStorage.getItem("uid"),
  });

  let history = useHistory();
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const response = await fetch(
      `https://your-notes-by-sk.onrender.com/api/posts/${userid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernn: localStorage.getItem("name"),
          userpp: localStorage.getItem("profile"),
          desc: input.desc,
          img: localStorage.getItem("img"),
          userid: input.userid,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json) {
      history.push("/social");
      setIsloading(false);
      window.location.reload();
      alert("Post Sent Sucessfully");
    } else {
      alert("Enter Image To Post");
      setIsloading(false);
    }
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
          localStorage.setItem("img", Picture);
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
const handlechange = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
};
  return (
    <>
      <div>
        <h2>Create a New Post</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputname1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="desc"
            onChange={handlechange}
            id="exampleInputname1"
            aria-describedby="nameHelp"
          />
          <div id="nameHelp" className="form-text">
             Tell Us Something About Your Post.
          </div>
        </div>
        <input
          type="file"
          name="img"
          id="img"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <button
          onClick={handlePostSubmit}
          style={{
            backgroundColor: "#F21401",
            border: "none",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          {isloading ? (
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </>
  );
}

export default PostForm;
