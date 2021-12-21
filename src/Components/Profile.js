import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import ShowLike from "./ShowLike";
import AddComment from "./AddComment";
import Comment from "./Comment";

function Profile() {
  const { id } = useParams();
  const [userData, setUserdata] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);
  
  // It snapshots users current state   
  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserdata(snap.data());
    });
  }, [id]);

  // Get all the posts of that user  
  useEffect(async () => {
    if (userData != null) {
      let postArr = [];
      for (let i = 0; i < userData.postIds.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();
          postArr.push({ ...postData.data(), postId: postData.id });
      }

      setPosts(postArr);
      console.log(postArr);
    }
  }, [userData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} />
              </div>
              <div className="info">
                <Typography variant="h5">Email : {userData.email}</Typography>
                <Typography variant="h6">
                  Posts : {userData?.postIds?.length}
                </Typography>
              </div>
            </div>
            <div className="video-container">
              <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
              <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video muted="muted">
                      <source src={post.postUrl} />
                    </video>
                    <div className="fa">
                      <Avatar src={post.userProfile} />
                      <h4>{post.userName}</h4>
                    </div>
                    <Like userData={userData} postData={post} />
                    <ChatBubbleIcon
                      className="chat"
                      onClick={handleClickOpen}
                    />
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
