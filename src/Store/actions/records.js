import * as actionTypes from '../actionTypes';
import * as firebase from 'firebase';
import axios from 'axios';

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
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            // console.log(response.data);
            for(let key in response.data){
                // console.log('MOre tests: ' + response.data[key]);
                if(response.data[key].contacted === false){
                  unContacted.push(response.data[key]);
                }
            }
            dispatch(getUncontactSuccess(unContacted));
        })
        .catch(err => dispatch(getUncontactedFail(err.message)));
        // firebase.database().ref().once('value')
        // .then(data => {
        //     const obj = data.child('/orders').val();
        //     for(let key in obj){
        //         if(obj[key].contacted === false){
        //             unContacted.push(obj[key]);
        //         }
        //     }
        //     dispatch(getUncontactSuccess(unContacted))
        // })
        // .catch(err => {
        //     console.log(err)
        //     dispatch(getUncontactedFail(err.message));
        // });
        // setTimeout(() => {
        //     if(unContacted.length === 0){
        //         dispatch(getUncontactedFail('Network Error check your connection!'));
        //     }
        // }, 5000);
    }
}
