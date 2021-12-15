import React,{useState, useEffect} from 'react';
import {auth} from '../firebase';

export const AuthContext = React.createContext();

// Children are the components we had wrapped inside AuthProvider(login, signup) in App.js file so that they can use store
export function AuthProvider({children}){
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })

        // cleanup
        return () => {
            unsub();
        }
    },[])

    const store = {
        user,
        signup,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}