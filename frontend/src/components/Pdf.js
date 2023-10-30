import noteContext from "../context/notes/noteContext";
import { useEffect } from "react";
import React, { useContext } from "react";
import PdfItem from "./PdfItem";
import { useHistory } from "react-router-dom";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getpdf } = context;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpdf();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 style={{ marginTop: "0.5em", marginLeft: "1em" }}>Your Pdf's</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note) => {
          return <PdfItem key={note._id} note={note} />;
        })}
        ;
      </div>
    </>
  );
}
