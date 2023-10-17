
import noteContext from "../context/notes/noteContext"
import React, { useContext, useState } from 'react'

export default function AddNote() {
    const [pic, setPic] = useState();
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:"",images: localStorage.getItem("link")})
    const handleclick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag,note.images);
        alert("Note Added Sucessfully");
        setNote({title:"",description:"",tag:"",images:""});
           
    }
    const onchange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const postDetails = (pics) => {
      if (pics === undefined) {
        alert("enter image")
        return;
      }
      console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
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
            localStorage.setItem("link", Picture);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Enter Image")
        return;
      }
    };

  return (
    <div className="container">
      <h1 className="mx-5 ">Add Your Notes Here</h1>
      <div className="contact-contactform">
        <form id="Myform">
          <div className="contact-form2content">
            <input
              type="text"
              name="title"
              placeholder="  Title"
              id="title"
              className="contact-inp2"
              value={note.title}
              onChange={onchange}
              required
            />
            <br />
            <br />
            <textarea
              name="description"
              placeholder=" Description"
              rows="10"
              id="description"
              value={note.description}
              className="contact-inp3 my-2"
              onChange={onchange}
              required
            ></textarea>
            <br />
            <input
              type="text"
              name="tag"
              placeholder="  Tag"
              id="tag"
              className="contact-inp2"
              value={note.tag}
              required
              onChange={onchange}
              />
            <input
              type="file"
              className="contact-inp2"
              accept="image/*"
              name="images"
              id="images"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <button
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              onClick={handleclick}
            >
              {" "}
              Submit Note{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
