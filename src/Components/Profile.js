import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import ShowLike from "./ShowLike";
import AddComment from "./AddComment";
import Comment from "./Comment";
import './Profile.css';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);
  
  // It snapshots users current state   
  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserData(snap.data());
    });
  }, [id]);

  // Get all the posts of that user  
  useEffect(async () => {
    if (userData != null) {
      let postArr = [];
      for (let i = 0; i < userData.postIds.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();
          postArr.push({...postData.data(), postId: postData.id});
      }

      setPosts(postArr);
    }
  });

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
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
  
              <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
              <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video muted="muted" onClick={() => handleClickOpen(post.postId)}>
                      <source src={post.postUrl} />
                    </video>
                    <Dialog
                      open={open==post.postId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth="md"
                    >
                      <div className="modal-container">
                        <div className="video-modal">
                          <video autoPlay={true} muted="muted" controls>
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
                            <div style={{display:'flex'}}>
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
        </>
      )}
    </>
  );
}

export default Profile;
