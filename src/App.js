import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
          alt="Logo-main"
        />
      </div>
      <div className="app__body">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            userName={post.userName}
            caption={post.caption}
            imgUrl={post.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
