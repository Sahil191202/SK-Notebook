import React, { useEffect, useState } from 'react'
import onlineIcon from "../icons/onlineIcon.png";
import closeIcon from "../icons/closeIcon.png";
import "./InfoBar.css";

export default function InfoBar() {
   const [friend, setFriend] = useState([]);
    const myid = localStorage.getItem("uid");
  useEffect(() => {
    fetch(`https://your-notes-by-sk.onrender.com/api/auth?id=${myid}`)
      .then((response) => response.json())
      .then((data) => {
        setFriend(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching Name:", error);
      });
  }, [myid]);
  return (
    <>
      <div className="infoBar">
          <div className="leftInnerContainer">
                <img
                  className="onlineIcon"
                  src={onlineIcon}
                  alt="online icon"
                />
                <h3>{friend.name}</h3>
              </div>
        <div className="rightInnerContainer">
          <a href="/social">
            <img src={closeIcon} alt="close icon" />
          </a>
        </div>
          </div>
    </>
  );
}
