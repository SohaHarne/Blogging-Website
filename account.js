import React from "react";
import "./account.css";
import  {useState,useEffect} from "react";


const Account = () => {
    const[username,setUsername]=useState("");
const[posts,setPosts]=useState([]);
    useEffect(() => {
  fetch(
    `http://localhost:5000/account/${username}`
  )
    .then((res) => res.json())
    .then((data) => setPosts(data));
}, []);
{posts.map((post) => (
  <div
    key={post.id}
    className="post-card"
  >
    <img
      src={`http://localhost:5000${post.image}`}
      alt=""
      className="post-image"
    />

    <h3>{post.title}</h3>

    <p>{post.content}</p>
  </div>
))}

  return (
    
    <div className="account-container">
      <div className="profile-card">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-pic"
          />

          <h2>Soha Harne</h2>
          <p>Soha Harne</p>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h3>120</h3>
            <p>Followers</p>
          </div>

          <div className="stat-box">
            <h3>95</h3>
            <p>Following</p>
          </div>

          <div className="stat-box">
            <h3>24</h3>
            <p>Posts</p>
          </div>
        </div>

        <div className="follow-buttons">
          <button className="follow-btn">Follow</button>

          <button className="unfollow-btn">Unfollow</button>
        </div>

        <div className="bio-section">
          <h3>Bio</h3>

          <p>
            Frontend Developer | Blogger | Tech Enthusiast
          </p>

          <button className="edit-btn">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Account;