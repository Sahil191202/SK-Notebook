import React, { useContext, useEffect, useRef, useState } from "react";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import authContext from "../../context/auth/AuthContext";
import "./Messenger.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Convo from "./Convo";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showConversations, setShowConversations] = useState(true); // Track the display state
  const context = useContext(authContext);
  const { credentials } = context;
  const userid = localStorage.getItem("uid");
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://your-notes-by-sk.onrender.com");

    socket.current.on("getMessage", (data) => {
      console.log("getMessage event received:", data);
      try {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.error("Error setting arrival message:", error);
      }
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userid);
  }, [userid]);

  useEffect(() => {
    fetch(`https://your-notes-by-sk.onrender.com/api/conversations/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, [userid]);

  useEffect(() => {
    if (currentChat) {
      fetch(
        `https://your-notes-by-sk.onrender.com/api/messages/${currentChat._id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error("Error fetching Messages:", error);
        });
    }
  }, [currentChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      sender: userid,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userid);
    console.log(receiverId);

    socket.current.emit("sendMessage", {
      senderId: userid,
      receiverId,
      text: newMessages,
    });
    console.log("sendMessage event emitted");

    try {
      const res = await fetch(
        "https://your-notes-by-sk.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      setMessages([...messages, data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleConversationClick = (conversation) => {
    setCurrentChat(conversation);
    setShowConversations(false); // Hide conversations when a chat is selected
  };

  return (
    <div>
      <div className="outerContainer">
        <div className="containermes">
          <div className="infocont">
            <InfoBar />
          </div>
          <ScrollToBottom className="messages">
            {currentChat ? (
              <>
                {messages.map((message) => (
                  <Messages
                    key={message._id}
                    message={message}
                    own={message.sender === userid}
                  />
                ))}
              </>
            ) : (
              <span>Start A Conversations</span>
            )}
          </ScrollToBottom>
          {showConversations && (
            <div className="conversationsContainer">
              {conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  className="convocont"
                  onClick={() => handleConversationClick(conversation)}
                >
                  <Convo
                    conversation={conversation}
                    currentUser={credentials}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="inputcont">
            <form className="formmes">
              <input
                className="inputmes"
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setNewMessages(e.target.value)}
                value={newMessages}
              />
              <button className="sendButtonmes" onClick={handleSend}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
