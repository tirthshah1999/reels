import React,{useState, useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({userData, postData}) {
    const [like, setLike] = useState(null);

    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true: false;
        setLike(check);
    }, [postData])


    const handleLike = () => {
        // if like is true then we have to dislike it, so remove that userId from likes arr
        if(like == true){
            let narr = postData.likes.filter((el) => el !== userData.userId)
            database.posts.doc(postData.postId).update({           // postId is that docId only
                likes: narr
            })
        }else{
            let narr = [...postData.likes, userData.userId];
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    }

    return (
        <div>
            {
                like !== null?
                <>
                {
                    like==true?<FavoriteIcon className={`icon-styling like`} onClick={handleLike}/> :<FavoriteIcon className={`icon-styling unlike`} onClick={handleLike}/>
                }
                </>:
                <></> 
            }
        </div>
    )
}

export default Like
