import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import authContext  from "../../context/auth/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(authContext);
//   const [followed, setFollowed] = useState(
//     currentUser.followings.includes(user?.id)
//   );

//   useEffect(() => {
//     const getFriends = async () => {
//       try {
//         const friendList = await axios.get("/users/friends/" + user._id);
//         setFriends(friendList.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getFriends();
//   }, [user]);

//   const handleClick = async () => {
//     try {
//       if (followed) {
//         await axios.put(`/users/${user._id}/unfollow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "UNFOLLOW", payload: user._id });
//       } else {
//         await axios.put(`/users/${user._id}/follow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "FOLLOW", payload: user._id });
//       }
//       setFollowed(!followed);
//     } catch (err) {}
//   };
  const PF = "http://localhost:5000/images";
  const userId = "65448a0960fd5c0639101e44";
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/friends/${userId}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setFriends(data);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, [userId]); // Inc

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((friend) => (
            <li key={friend._id} className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src={friend.profile}
                  alt=""
                />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{friend.name}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
         <HomeRightbar />
      </div>
    </div>
  );
}