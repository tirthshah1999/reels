import React, {useState,useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import {database} from '../firebase';

function Comment({postData}) {
    const [comments, setComments] = useState(null);
    
    useEffect(async() => {
        let arr = [];
        for(let i = 0; i < postData.comments.length; i++){
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }

        setComments(arr);
    }, [postData])

    return (
        <div>
            {
                comments==null? <CircularProgress/> :
                <>
                {
                    comments.map((comment, index) => (
                        <div key={index} style={{display:'flex'}}>
                            <Avatar src={comment.userProfile}/>
                            <p>&nbsp;&nbsp; <span style={{fontWeight:'bold'}}>{comment.userName}</span>&nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comment;
