
import noteContext from "../context/notes/noteContext"
import React, { useContext, useState } from 'react'

export default function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleclick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        alert("Note Added Sucessfully");
        setNote({title:"",description:"",tag:""});
        
        
    }
    const onchange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <h1 className="mx-5 ">Add Your Notes Here</h1>
      <div className="contact-contactform">
        <form id="Myform">
          <div className="contact-form2content">
            <input type="text" name="title" placeholder="  Title" id="title" className="contact-inp2" value={note.title} onChange={onchange} required/><br /><br />
            <textarea name="description" placeholder=" Description" rows="10" id="description" value={note.description} className="contact-inp3 my-2 mb-2" onChange={onchange} required ></textarea><br />
            <input type="text" name="tag" placeholder="  Tag" id="tag" className="contact-inp2 " value={note.tag} required onChange={onchange} /><br /><br />
            <button disabled={note.title.length<5||note.description.length<5} type="submit" onClick={handleclick}> Submit Note </button>
          </div>
        </form>
        </div>
    </div>
  )
}
