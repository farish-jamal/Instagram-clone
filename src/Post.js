import React from "react";
import Avatar from "@mui/material/Avatar";
import "./post.css";

function Post({ userName, caption, imgUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          style={{ marginRight: "10px" }}
          alt={userName}
          src="/static/images/avatar/3.jpg"
        />
        <h3>{userName}</h3>
      </div>
      <div className="post__img">
        <img src={imgUrl} alt="" />
      </div>
      <div className="post__captions">
        <h4 style={{ fontWeight: 400 }}>
          <strong style={{ marginRight: "10px" }}>{userName}</strong>
          {caption}
        </h4>
      </div>
    </div>
  );
}

export default Post;
