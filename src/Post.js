import React from 'react'
import './post.css'

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg" alt="" />
                <h3>Username</h3>
            </div>
            <div className="post__img">
                <img src="https://i.pinimg.com/originals/72/01/9b/72019bfc1e8a4fa26ab563504f7147e5.jpg" alt="" />
            </div>
            <div className="post__comments">
                <h4 style={{fontWeight:400}}><strong>Username</strong>Yohooo!!!</h4>
            </div>
        </div>
    )
}

export default Post
