import React, { useState } from 'react'
import { Search } from "@mui/icons-material";
import './topbar.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Searchuser() {
       const [searchInput, setSearchInput] = useState("");
       const [userData, setUserData] = useState(null);
       const [name, setName] = useState("");
       const [profile, setProfile] = useState("");
       const [userId, setUserId] = useState("")
       let history = useHistory();

       const handleSearch = async () => {
         try {
           const response = await fetch(
             `https://your-notes-by-sk.onrender.com/api/auth/?name=${searchInput}`
           );
           const userData = await response.json();

           if (userData.name && userData.profile && userData._id) {
             const { name, profile, _id } = userData;
             setName(name);
             setProfile(profile);
              setUserId(_id); 
           } else {
             alert("User Dosent Exists");
             setUserData(null);
           }
         } catch (error) {
           console.error("Error searching for user:", error);
           setUserData(null);
         }
       };
        const handleFollow = async () => {
    try {
      const response = await fetch(
        `https://your-notes-by-sk.onrender.com/api/auth/${userId}/follow`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
          body: JSON.stringify({ userid: localStorage.getItem("uid") }),
        }
      );

      if (response.ok) {
        history.push("/social")
        window.location.reload()
        console.log("User followed successfully");
      } else {
        console.log("Failed to follow user");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
        const handleUnFollow = async () => {
    try {
      const response = await fetch(
        `https://your-notes-by-sk.onrender.com/api/auth/${userId}/unfollow`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
          body: JSON.stringify({ userid: localStorage.getItem("uid") }),
        }
      );

      if (response.ok) {
        history.push("/social");
        window.location.reload();
        console.log("User Unfollowed successfully");
      } else {
        console.log("Failed to follow user");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return (
    <div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            placeholder="Search by ID or Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div>
            <button
              onClick={handleSearch}
              style={{ display: "flex", justifyContent: "right" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            {profile.length>5 ?  (
          <div>

              <p>{name}</p>
              <img src={profile} alt="" className="topbarImg" />
          <button onClick={handleFollow}>
            Follow
          </button>
          <button onClick={handleUnFollow}>
            UnFollow
          </button>
          </div>
            )
            :("")
            }
        </div>
      </div>
    </div>
  );
}
