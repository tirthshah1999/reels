import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../Context/Auth';
import { database } from '../firebase';
import UploadVideo from './UploadVideo';
import Posts from './Posts';

function Feed() {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        })
        
        // cleanup
        return () => {
            unsub();
        }
    }, [user])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <div className='comp' style={{width: '50%'}}>
                <h1>Hello From Feed</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <UploadVideo user={userData} />
            <Posts userData={userData} />
        </div>
    )
}

export default Feed
