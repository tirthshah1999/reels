import React,{useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import { AuthContext } from '../Context/Auth';

function PrivateRouting({component: Component, ...rest}) {
    const {user} = useContext(AuthContext);
    return (
        <Route {...rest} render={ 
            props => {
                return user ? <Component {...props}/> : <Redirect to='/login' />
            }
        } />
    )
}

export default PrivateRouting;
