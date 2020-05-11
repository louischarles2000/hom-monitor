import * as actionTypes from '../actionTypes';
import { updateObject } from '../../Utility';

const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {loading: true, error: null})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, 
        user: action.user, 
        token: action.token
    });
}

const authFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

const logOut = (state, action) => {
    return updateObject(state, {token: null, user: null});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return logOut(state, action);
        default: return state;
    }
};

export default reducer;