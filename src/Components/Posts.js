import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import Video from "./Video";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import AddComment from "./AddComment";
import ShowLike from "./ShowLike";
import Comment from "./Comment";

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Getting all the videos in desc order (latest one at top)
  useEffect(() => {
    let postsArr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        postsArr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          postsArr.push(data);
        });
        setPosts(postsArr);
      });
    return unsub;
  }, []);

  return (
    <div>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.postUrl} />
                <div className="fa">
                  <Avatar src={post.userProfile} />
                  <h4>{post.userName}</h4>
                </div>
                <Like userData={userData} postData={post} />
                <ChatBubbleIcon className="chat" onClick={handleClickOpen} />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="lg"
                >
                  <div className="modal-container">
                    <div className="video-modal">
                      <video autoPlay="true" muted="muted" controls>
                        <source src={post.postUrl} />
                      </video>
                    </div>
                    <div className="comment-modal">
                    <Card className="card1">
                        <Comment postData={post} />
                    </Card>
                      <Card variant="outlined" className="card2">
                        <Typography style={{ padding: "0.4rem" }}>
                          {post.likes.length == 0
                            ? "Liked by nobody"
                            : `Liked by ${post.likes.length} users`}
                        </Typography>
                        <div>
                          <ShowLike
                            postData={post}
                            userData={userData}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <AddComment
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            userData={userData}
                            postData={post}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
