import noteContext from "../context/notes/noteContext";
import { useEffect } from "react";
import React, { useContext } from "react";
import ImageItem from "./ImageItem";
import { useHistory } from "react-router-dom";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getimages } = context;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getimages();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 style={{ marginTop: "0.5em", marginLeft: "1em" }}>Your Images</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note) => {
          return <ImageItem key={note._id} note={note} />;
        })}
        
      </div>
    </>
  );
}
