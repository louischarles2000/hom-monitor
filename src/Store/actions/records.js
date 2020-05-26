import * as actionTypes from '../actionTypes';
import * as firebase from 'firebase';

export const getRecordsStart = () => ({type: actionTypes.GET_RECORDS_START});

export const getRecordsFail = err => ({type: actionTypes.GET_RECORDS_FAIL,err});

export const getRecordsSuccess = records => ({type: actionTypes.GET_RECORDS_SUCCESS, records});

export const getContactedStart = () => ({type: actionTypes.GET_CONTACTED_START});

export const getContactedFail = err => ({type: actionTypes.GET_CONTACTED_FAIL, err});

export const getConatctedSuccess = contacted => ({type: actionTypes.GET_CONTACTED_SUCCESS, contacted});

export const getUncontactedStart = () => ({type: actionTypes.GET_UNCONTACTED_START});

export const getUncontactedFail = err => ({type: actionTypes.GET_UNCONTACTED_FAIL, err});

export const getUncontactSuccess = uncontacted => ({type: actionTypes.GET_UNCONTACTED_SUCCESS, uncontacted});


export const getRecords = () => {
    return dispatch => {
        dispatch(getRecordsStart());
    }
}

export const getContacted = () => {
    return dispatch => {
        dispatch(getContactedStart());
        console.log('MOve to contacted')
    }
}

export const getUncontacted = () => {
    return dispatch => {
        dispatch(getUncontactedStart());
        const unContacted = [];

        firebase.database().ref().once('value')
        .then(data => {
            const obj = data.child('/orders').val();
            for(let key in obj){
                if(obj[key].contacted === false){
                    unContacted.push(obj[key]);
                }
            }
            dispatch(getUncontactSuccess(unContacted))
        })
        .catch(err => {
            console.log(err)
            dispatch(getUncontactedFail(err.message));
        });
        setTimeout(() => {
            if(unContacted.length === 0){
                dispatch(getUncontactedFail('Network Error check your connection!'));
            }
        }, 5000);
    }
}
