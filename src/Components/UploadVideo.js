import React, {useState} from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database, storage } from '../firebase';

function UploadVideo(props) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFiles = async(file) => {
        if(file === null){
            setError("Please select a file to continue");
            setTimeout(() => {
                setError("");
            }, 2000);

            return;
        }

        // file size > 100 MB not allowed
        if( (file.size / (1024 * 1024)) > 100){
            setError("This video is very big, can't upload");
            setTimeout(() => {
                setError("");
            }, 2000);

            return;
        }

        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        
        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            console.log(`Upload is ${progress} done.`);
        }

        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
            return;
        }

        function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                let obj = {
                    likes: [],
                    comments: [],
                    postId: uid,
                    postUrl: url,
                    userName : props.user.fullName,
                    userProfile : props.user.profileUrl,
                    userId : props.user.userId,
                    createdAt : database.getTimeStamp()
                }

                database.posts.add(obj).then(async(ref) => {
                    let res = await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => {
                        setError("");
                    }, 2000);

                    setLoading(false);
                })
            })

            // setLoading(false);
        }
    }

    return (
        <>
          {
            error !== "" ? <Alert severity="error">{error}</Alert> :   
            <div>
                <input type="file" accept="video/*" id="upload-input" style={{display: 'none'}} onChange={(e) => handleFiles(e.target.files[0])} />
                <label htmlFor="upload-input">
                    <Button variant="outlined" color="secondary" component="span" disabled={loading}>
                       <MovieIcon/> &nbsp; Upload Video
                    </Button>
                </label>
               {loading && <LinearProgress color="secondary" />}
            </div>
          }
        </>
    )
}

export default UploadVideo;
