import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../Context/Auth';
import { database } from '../firebase';
import UploadVideo from './UploadVideo';
import Posts from './Posts';
import Navbar from './Navbar';

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
        <>
            <Navbar userData={userData} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <UploadVideo user={userData} />
                <Posts userData={userData} />
            </div>
        </>
    )
}

export default Feed
