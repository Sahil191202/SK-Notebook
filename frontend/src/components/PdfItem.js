import React, { useContext } from "react";
import "./Noteitem.css";
import pdflogo from "../assests/pdf.png";

export default function Noteitem(props) {
  const formateDate = (date) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const { note } = props;
  return (
    <div className="item" style={{ height: "auto", maxWidth: "100%" }}>
      <a href={note.pdf} download='PDF'>
        {note.pdf ? (
          <img style={{ height: "auto", width: "100%" }} src={pdflogo} />
        ) : (
          ""
        )}
      </a>
      <div className="card-footer text-muted">
        Created At : {formateDate(note.date)}
      </div>
    </div>
  );
}
