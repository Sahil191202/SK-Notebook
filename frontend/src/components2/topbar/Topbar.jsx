import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import authContext from "../../context/auth/AuthContext";

export default function Topbar() {
   const [searchInput, setSearchInput] = useState("");
   const [userData, setUserData] = useState(null);
   const [name, setName] = useState("");
   const [profile, setProfile] = useState("");

   const handleSearch = async () => {
     try {
       const response = await fetch(`http://localhost:5000/api/auth/?name=${searchInput}`);
       const userData = await response.json();
       
       if (userData.name && userData.profile){
        const {name , profile } = userData;
        setName(name);
        setProfile(profile);
        console.log(name)
        console.log(profile)
       } else{
        console.error("User Dosent Exists")
        setUserData(null)
       }
      } catch (error) {
        console.error("Error searching for user:", error);
       setUserData(null);
     }
   };
  const context = useContext(authContext);
  const { credentials, getUser } = context;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SahilBook</span>
        </Link>
      </div>
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
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <div>
            <p>{name}</p>
            <img src={profile} alt="" className="topbarImg" />
          </div>

          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${credentials.name}`}>
          <img
            src={credentials.profile ? credentials.profile : ""}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

