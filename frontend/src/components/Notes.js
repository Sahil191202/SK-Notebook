
import noteContext from "../context/notes/noteContext"
import { useEffect ,useState,useRef } from "react";
import React, { useContext } from 'react'
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useHistory } from 'react-router-dom'


export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote} = context;
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    const handleclick =(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const updateNote = (currentNote) =>{
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }
    const handlechange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }        
    
    return (
        <>
            <button type="button"  ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title " id="exampleModalLabel">Note title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="Myform">
                                <div className="contact-form2content">
                                    <input type="text" value={note.etitle} name="etitle" placeholder="  Title" id="title" className="contact-inp2" required onChange={handlechange} /><br /><br />
                                    <textarea name="edescription" value={note.edescription} placeholder=" Description" rows="10" id="description" className="contact-inp3" required onChange={handlechange} ></textarea><br />
                                    <input type="text" name="etag" value={note.etag} placeholder="  Tag" id="tag" className="contact-inp2" required onChange={handlechange} /><br /><br />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote />
            <h1>Your Notes</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {notes.map((note) => {
                    return <Noteitem updateNote={updateNote} key={note._id} note={note} />;
                })};
            </div>
        </>
    )
}
