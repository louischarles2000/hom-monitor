import * as actionTypes from '../actionTypes';
import firebase from 'firebase';
import User from '../../component/User/User';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, user) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token,
        user
    }
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logOut = () => {
    localStorage.removeItem('authToken');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        if(isSignUp){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(authSuccess(res.user.refreshToken, res.user.email));
                firebase.auth().updateCurrentUser(firebase.auth().currentUser);
                localStorage.setItem('authToken', res.user.refreshToken);
                localStorage.setItem('userEmail', res.user.email);
            })
            .catch(error => {
                const code = error.code.split('/').pop();
                const errCode = code.split('-').join(' ');
                dispatch(authFail(errCode));
            });
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            dispatch(authSuccess(res.user.refreshToken, res.user.email));
            console.log(res.user.email)
            firebase.auth().updateCurrentUser(firebase.auth().currentUser);
            localStorage.setItem('authToken', res.user.refreshToken);
            localStorage.setItem('userEmail', res.user.email);
            window.location.reload();
        })
        .catch(error => {
            const code = error.code.split('/').pop();
            const errCode = code.split('-').join(' ');
            dispatch(authFail(errCode));
        });
    }
}