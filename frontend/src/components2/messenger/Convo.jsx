import "./Convo.css"
import { useEffect, useState } from "react";

export default function Convo({ conversation, currentUser }) {
  const myid = localStorage.getItem("uid");
  const [user, setUser] = useState(null);

  const friendId = conversation.members.find((member) => member !== myid);
  // console.log(friendId)
  useEffect(() => {
    fetch(`https://your-notes-by-sk.onrender.com/api/auth?id=${friendId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, [myid, conversation]);

  return (
    <>
      <div className="conversation">
        <img className="conversationImg" src={user?.profile} alt="" />
        <span className="conversationName">{user?.name}</span>
      </div>
    </>
  );
}
