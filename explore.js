import React, { useEffect, useState } from "react";
import "./explore.css";

function Explore() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/explore")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

 return (
  <div className="explore-container">
    <h2 className="explore-title">Explore</h2>

    <input
      type="text"
      placeholder="Search posts..."
      className="explore-search"
    />

    {posts.length === 0 ? (
      <p className="no-posts">No posts yet</p>
    ) : (
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <img
              src={`http://localhost:5000${post.image}`}
              alt=""
              className="post-image"
            />

            <div className="post-content">
              <div className="post-user">
                @{post.username}
              </div>

              <p className="post-caption">
                {post.caption}
              </p>

              <button className="like-btn">
                ❤️ Like
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);}
export default Explore;