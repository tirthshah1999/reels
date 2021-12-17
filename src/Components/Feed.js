import React, {useContext} from 'react';
import { AuthContext } from '../Context/Auth';

function Feed() {
    const {logout} = useContext(AuthContext);
    return (
        <div>
            <h1>Hello From Feed</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Feed
