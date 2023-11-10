import React from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  const handleSectionClick = (path) => {
    history.push(path);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="notes" style={{ textAlign: "center" }}>
        <a
          className="btn btn-primary"
          href="/notes"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick("/notes");
          }}
          style={{
            backgroundColor: "#F21401",
            border: "none",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Notes
        </a>
      </div>
      <hr style={{ margin: "0 20px" }} />
      <div className="social" style={{ textAlign: "center" }}>
        <a
          className="btn btn-primary"
          href="/social"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick("/social");
          }}
          style={{
            backgroundColor: "#F21401",
            border: "none",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          Social
        </a>
      </div>
    </div>
  );
};

export default HomePage;
