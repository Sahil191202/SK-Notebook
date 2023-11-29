import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./feed.css";
import logo from "../../assests/insta.png";
import liked from "../../assests/liked.png";
import home from "../../assests/home.png";
import search from "../../assests/search.png";
import reels from "../../assests/reels.png";
import messages from "../../assests/messages.png";
import notification from "../../assests/notification.png";
import create from "../../assests/create.png";
import more from "../../assests/more.jpg";
import comment from "../../assests/comment.png";
import authContext from "../../context/auth/AuthContext";

function Home() {
  const openchat = useRef(null)
  const openchats = () => {
    openchat.current.click()
  }
  const context = useContext(authContext);
  const [convofriend, setConvofriend] = useState({
    senderId: "",
    receiverId: "",
  });
  const { credentials, getUser } = context;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  const [posts, setPosts] = useState([]);
  const userid = localStorage.getItem("uid");
  useEffect(() => {
    fetch(`https://your-notes-by-sk.onrender.com/api/posts/timeline/${userid}`)
      .then((response) => response.json())
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, [userid]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetch(`https://your-notes-by-sk.onrender.com/api/auth/friends/${userid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFriends(data);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, [userid]); // Inc

  // post like dislike
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `https://your-notes-by-sk.onrender.com/api/posts/${postId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userid }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === postId
              ? {
                  ...prevPost,
                  likes:
                    responseData === "The post has been liked"
                      ? [...prevPost.likes, userid]
                      : prevPost.likes.filter((like) => like !== userid),
                }
              : prevPost
          )
        );
        console.log("Like operation successful");
      } else {
        console.log("Failed to like/dislike post");
      }
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };
  const [hide, setHide] = useState(false);
  const handlehide = () => {
    setHide(!hide);
  };

  let dost = friends;

  const createconvo = async (friendId) => {
    try {
      const response = await fetch(
        "https://your-notes-by-sk.onrender.com/api/conversations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: localStorage.getItem("uid"),
            receiverId: friendId,
          }),
        }
      );
    } catch (error) {
      console.error("Error Creating Convo:", error);
    }
  };
  return (
    <div className="main">
      <button
        onClick={handlehide}
        id="hidebutton"
        style={{ backgroundColor: "#051010" }}
      >
        <img src={more} height="45px" style={{ filter: "invert(1)" }} />
      </button>
      {hide ? (
        <div className="sideMenu">
          <div className="logo">{/* <img src={logo} height="40px" /> */}</div>
          <div>
            <div className="row">
              <img className="rowimg" src={home} height="25px" />
              <Link className="linktag" to="/social">
                Home
              </Link>
            </div>
            <div className="row">
              <img className="rowimg" src={search} height="25px" />
              <Link className="linktag" to="/searchuser">
                Search
              </Link>
            </div>
            <div className="row">
              <img className="rowimg" src={reels} height="25px" />
              <Link className="linktag" to="/videopost">
                BTS
              </Link>
            </div>
            <div className="row">
              <img className="rowimg" src={messages} height="25px" />
              <Link className="linktag" to="/messenger">
                Message
              </Link>
            </div>
            <div className="cust_row">
              <img src={create} height="45px" style={{ filter: "invert(1)" }} />
              <Link className="linktag" to="/createpost">
                Create
              </Link>
            </div>
            <div className="cust_row">
              <Link className="linktag" to="/select">
                Logout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container commonRow">
        <div className="post">
          <div>
            <div className="postContainer">
              <div className="postRow">
                <div className="commonRow">
                  <div></div>
                </div>
              </div>
              {posts.map((post) => (
                <div key={post._id}>
                  <img className="postProfile" src={post.userpp} alt="" />
                  <span
                    id="userpp"
                    style={{
                      margin: "1em",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {post.usernn}
                  </span>
                  <div className="commentBorder"></div>
                  <img src={post.img} className="postfeed" />
                  <div className="activity"></div>
                  <div className="postRow">
                    <div className="activity">
                      <a onClick={() => handleLike(post._id)}>
                        {post.likes.includes(userid) ? (
                          <img src={liked} height="25px" />
                        ) : (
                          <img
                            src={notification}
                            height="30px"
                            style={{ filter: "invert(1)" }}
                          />
                        )}
                      </a>
                      <img
                        src={comment}
                        height="37px"
                        style={{ filter: "invert(1)" }}
                      />
                      <img
                        src={messages}
                        height="25px"
                        style={{ filter: "invert(1)" }}
                        onClick={async () => {
                          try {
                            if (navigator.share) {
                              await navigator.share({
                                title: "Image Sharing",
                                text: "Check out this image!",
                                url: `${post.img}`,
                              });
                            } else {
                              alert(
                                "Web Share API is not supported in this browser."
                              );
                            }
                          } catch (error) {
                            console.error("Error sharing:", error);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="commonRow">
                    <div className="liked">
                      <div className="likedProfile"></div>
                      <div className="likedProfile1"></div>
                    </div>
                    <span className="likeCount">
                      {" "}
                      <span>{post.likes.length} Likes</span>
                    </span>
                  </div>
                  <div>
                    <div>
                      <h3 id="description">{post.desc}</h3>
                      <div className="postRow">
                        <span className="addComment">Add a comment...</span>
                        <span className="emojiSize">☻</span>
                      </div>
                      <div className="commentBorder"></div>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="suggestion">
          <div className="postRow">
            <a href="/profilepage" className="linktag">
              <div className="commonRow">
                <div className="postProfile">
                  <img src={credentials.profile} alt="PP" />
                </div>
                <div className="suggestionProfile">
                  <span className="postName">{credentials.name}</span>
                </div>
              </div>
            </a>
          </div>
          <div className="postRow Suggested">
            <div>Friends</div>
          </div>
          {dost.length > 0 ? (
            <div className="postRow pding" id="friends">
              {friends.map((friend) => (
                <div
                  className="commonRow"
                  onClick={() => createconvo(friend._id)}
                  key={friend._id}
                  ref={openchat}
                >
                  <div className="postProfile">
                    <img src={friend.profile} alt="PP" />
                  </div>
                  <div className="suggestionProfile">
                    <span className="postName">{friend.name}</span>
                  </div>
                  <div
                    className="btn btn-primary"
                    style={{ backgroundColor: "#F21401", border: "none" }}
                    onClick={openchats}
                  >
                    <Link className="linktag" to="/messenger">
                      Chat
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "No Friends To Display"
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
