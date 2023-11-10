import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./feed.css";
import logo from "../../assests/insta.png";
import liked from "../../assests/heartliked.png";
import home from "../../assests/home.png";
import search from "../../assests/search.png";
import explore from "../../assests/explore.png";
import reels from "../../assests/reels.png";
import messages from "../../assests/messages.png";
import notification from "../../assests/notification.png";
import create from "../../assests/create.png";
import more from "../../assests/more.jpg";
import dot from "../../assests/dot.png";
import comment from "../../assests/comment.png";
import save from "../../assests/save.png";
import authContext from "../../context/auth/AuthContext";

function Home() {
  const context = useContext(authContext);
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
        console.log(postsData);
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
        console.log(responseData)
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
  const [hide, setHide] = useState(false)
  const handlehide = () =>{
  setHide(!hide)
  }

  return (
    <div className="main">
      <button onClick={handlehide} id="hidebutton">hello bhai</button>
      {hide ? (

        <div className="sideMenu">
        <div className="logo">
          <img src={logo} height="40px" />
        </div>
        <div>
          <div className="row">
            <img src={home} height="25px" />
            <h4 className="active">Home</h4>
          </div>
          <div className="row">
            <img src={search} height="25px" />
            <Link className="linktag" to="/searchuser">
              Search
            </Link>
          </div>
          <div className="row">
            <img src={explore} height="25px" />
            <h4>Explore</h4>
          </div>
          <div className="row">
            <img src={reels} height="25px" />
            <h4>Reels</h4>
          </div>
          <div className="row">
            <img src={messages} height="25px" />
            <h4>Message</h4>
          </div>
          <div className="row">
            <img src={notification} height="25px" />
            <h4>Notification</h4>
          </div>
          <div className="cust_row">
            <img src={create} height="45px" style={{ filter: "invert(1)" }} />
            <Link className="linktag" to="/createpost">
              Create
            </Link>
          </div>
          <div className="cust_row">
            <img src={more} height="45px" />
            <h4>More</h4>
          </div>
        </div>
      </div>
        ):("")}
      <div className="container commonRow">
        <div className="post">
          <div>
            <div className="postContainer">
              <div className="postRow">
                <div className="commonRow">
                  <div></div>
                </div>
                <img src={dot} height="20px" />
              </div>
              {posts.map((post) => (
                <div key={post._id}>
                  <img className="postProfile" src={post.userpp} alt="" />
                  <h3>{post.usernn}</h3>
                  <br />
                  <h2>{post.desc}</h2>
                  <img src={post.img} className="postfeed" />
                  <div className="activity">
                  </div>
                  <div className="postRow">
                    <div className="activity">
                    <a onClick={() => handleLike(post._id)}>
                      {post.likes.includes(userid) ? <img src={liked} height="60px"/> :  <img src={notification} height="30px"/>}
                    </a>
                      <img src={comment} height="37px" />
                      <img src={messages} height="25px" />
                    </div>
                    <img src={save} height="30px" />
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
                      <span className="postName">love_medics</span>
                      <span className="postDay"> Hiccups ...more</span>
                    </div>
                    <div>
                      <div className="postRow">
                        <span className="addComment">Add a comment...</span>
                        <span className="emojiSize">☻</span>
                      </div>
                      <div className="commentBorder"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="suggestion">
          <div className="postRow">
            <div className="commonRow">
              <div className="postProfile">
                <img src={credentials.profile} alt="PP" />
              </div>
              <div className="suggestionProfile">
                <span className="postName">{credentials.name}</span>
              </div>
            </div>
          </div>
          <div className="postRow Suggested">
            <div>Friends</div>
            <div className="seeAll">See All</div>
          </div>
          <div className="postRow pding" id="friends">
            {friends.map((friend) => (
              <div className="commonRow" key={friend._id}>
                <div className="postProfile">
                  <img src={friend.profile} alt="PP" />
                </div>
                <div className="suggestionProfile">
                  <span className="postName">{friend.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
