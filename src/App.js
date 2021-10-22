import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import ImageUpload from "./ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [opensignin, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // Modal styling :
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

  useEffect(() => {
    // Responding on every auth change :
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //If user  login :
        console.log(authUser);
        setUser(authUser);
      } else {
        //If User log out or user not available:
        setUser(null);
      }
    });
    return () => {
      // Cleanup before performing another task :
      unsubscribe();
    };
    // dependencies
  }, [user, username]);

  useEffect(() => {
    // collecting data from database:
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
  }, []);

  // Sign up Logic :
  const SignUp = (event) => {
    event.preventDefault();
    // Creating a new user in database :
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // updating the display name with username provided by user :
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
      // Setting modal close
    setOpen(false);
  };

  // Sign In logic :
  const SignIn = (event) => {
    event.preventDefault();
    // signIn with auth module :
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  return (
    <div className="app">
      {
        user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) :
        (
          <h3 style={{position: 'relative', top: '80px', textAlign: "center", paddingBottom:"20px"}}>Sorry! You need to login to upload</h3>
        )
      }
      {/* Modal for signIn */}
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

      {/* Modal for LogIn */}
      <Modal
        className="app__modal"
        open={opensignin}
        onClose={() => setOpenSignIn(false)}
      >
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
                onClick={SignIn}
                style={{
                  backgroundColor: "lightpink",
                  marginTop: "20px",
                  color: "#000",
                }}
              >
                SignIn
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
        {/* Conditional randering of sigin and logout */}
        {user ? (
          <Button
            onClick={() => auth.signOut()}
            style={{
              backgroundColor: "lightpink",
              marginRight: "20px",
              color: "#000",
            }}
          >
            Logout
          </Button>
        ) : (
          <div className="login__container">
            <Button
              onClick={() => setOpenSignIn(true)}
              style={{
                backgroundColor: "lightpink",
                marginRight: "20px",
                color: "#000",
              }}
            >
              SignIn
            </Button>
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
        )}
      </div>
      <div className="app__body">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            userName={post.username}
            caption={post.caption}
            imgUrl={post.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
