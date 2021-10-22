import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //If user  login
        console.log(authUser);
        setUser(authUser);
      } else {
        //If they log out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password).then((authUser)=>{
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="app">
      <Modal className="app__modal" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
                  alt="Logo-main"
                />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                onClick={SignUp}
                style={{
                  backgroundColor: "lightpink",
                  marginTop: "20px",
                  color: "#000",
                }}
              >
                SignUp
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
          alt="Logo-main"
        />
        <Button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "lightpink",
            marginRight: "20px",
            color: "#000",
          }}
        >
          SignUp
        </Button>
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
