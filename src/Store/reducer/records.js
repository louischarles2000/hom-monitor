import * as actionTypes from '../actionTypes';
import { updateObject } from '../../Utility';

const initialState = {
    loading: false,
    empty: false,
    error: null,
    records: null,
    contacted: null,
    unContacted: null,
    active: 'uncontacted',
    conatctInfo: null
}

const getRecordsStart = (state, action) => {
    return updateObject(state, {loading: true, active: 'records'});
}

const getContactedStart = (state, action) => {
    return updateObject(state, {loading: true, active: 'contacted'});
}

const getUncontactedStart = (state, action) => {
    return updateObject(state, {loading: true, active: 'uncontacted'});
}
const getUncontactedSuccess = (state, action) => {
    return updateObject(state, {loading: false, unContacted: action.uncontacted});
}
const getUncontactedFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.err});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_RECORDS_START: return getRecordsStart(state, action);
        case actionTypes.GET_CONTACTED_START: return getContactedStart(state, action);
        case actionTypes.GET_UNCONTACTED_START: return getUncontactedStart(state, action);
        case actionTypes.GET_UNCONTACTED_SUCCESS: return getUncontactedSuccess(state, action);
        case actionTypes.GET_UNCONTACTED_FAIL: return getUncontactedFail(state, action);
        default: return state;
    }
}

export default reducer;