import noteContext from "../context/notes/noteContext";
import { useEffect} from "react";
import React, { useContext } from "react";
import Videoitem from "./Videoitem";
import { useHistory } from "react-router-dom";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getVideos } = context;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getVideos();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <h1 style={{ marginTop: "2.5em", marginLeft: "1em" }}>Your Videos</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note) => {
          return (
            <Videoitem key={note._id} note={note} />
          );
        })}
        ;
      </div>
           
    </>
  );
}
