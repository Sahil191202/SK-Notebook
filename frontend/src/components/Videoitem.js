import React from "react";
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
  const { note} = props;
  return (
    <div className="item" style={{ maxWidth: "100%", height: "auto" }}>
      <a href={note.video} target="_blank">
        {note.video ? (
          <video style={{ height: "auto", width: "100%" }} controls>
            <source src={note.video} type="video/mp4" />
          </video>
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
