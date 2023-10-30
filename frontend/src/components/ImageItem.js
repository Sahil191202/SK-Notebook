import React, { useContext } from "react";
import "./Noteitem.css";

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
      <a href={note.images} target="_blank">
        {note.images ? (
          <img style={{ height: "auto", maxWidth: "100%" }} src={note.images} />
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
