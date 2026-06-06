import React, { useState } from "react";
import "./create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author: "Soha Harne",
        }),
      });
     
      const data = await response.json();
      console.log(data);
      alert("Post created successfully!");
    } catch (error) {
      console.error(error);
    }
};
return (
  <div className="create-container">
    <div className="create-card">
      <h2 className="create-title">
        Create New Post
      </h2>

      <input
        className="create-input"
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="create-textarea"
        placeholder="Write your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
       <input
  type="file"
  accept="image/*"
  className="create-input"
  onChange={(e) => setImage(e.target.files[0])}></input>

      <button
        className="create-btn"
        onClick={handleSubmit}
      >
        <input
  type="file"
  accept="image/*"
  className="create-input"
  onChange={(e) => setImage(e.target.files[0])}
/>
        Publish Post
      </button>
    </div>
  </div>
);};

export default Create;