import { CircularProgress } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { database } from '../firebase';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';

function Posts({userData}) {

    const [posts, setPosts] = useState(null);

    // Getting all the videos in desc order (latest one at top)
    useEffect(() => {
        let postsArr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            postsArr = [];
            querySnapshot.forEach((doc) => {
                let data = {...doc.data(), postId: doc.id}
                postsArr.push(data);
            })
            setPosts(postsArr);
        }) 
        return unsub;
    }, [])
    
    return (
        <div>
            {   
                posts == null || userData == null ? <CircularProgress /> :
                <div className="video-container">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <Video src={post.postUrl} />
                                    <div className="fa">
                                        <Avatar src={post.userProfile} />
                                        <h4>{post.userName}</h4>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Posts;