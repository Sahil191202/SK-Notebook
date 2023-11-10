import React, { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
const userid = localStorage.getItem("uid");
//   const [user, setUser] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

  // Fetch user profile information and their posts based on the userId
  useEffect(() => {
    // Fetch user information
    // fetch(`/api/user/profile/${userid}`)
    //   .then((response) => response.json())
    //   .then((userData) => {
    //     setUser(userData);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user profile:", error);
    //   });

    // Fetch user's posts
    fetch(`http://localhost:5000/api/posts/timeline/${userid}`)
      .then((response) => response.json())
      .then((postsData) => {
        setPosts(postsData);
        console.log(postsData)
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, [userid]);
  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <img style={{maxHeight:"200px",maxWidth:"200px"}} src={post.img} alt='' />
          <p>{post.caption}</p>
          <button>Like</button>
          <button>Dislike</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
