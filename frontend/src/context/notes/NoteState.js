import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "https://your-notes-by-sk.onrender.com";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  const addNote = async (title, description, tag, images) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, images:localStorage.getItem("link") }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    setTimeout(() => {
      localStorage.removeItem("link")
      
    }, 3000);
  };

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag, images) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, images:localStorage.getItem("link") }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].images = images;
        break;
      }
    }
    setNotes(newNotes);
    setTimeout(() => {
      localStorage.removeItem("link");
    }, 3000);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
