import * as actionTypes from '../actionTypes';
import firebase from 'firebase';
import { getNumbers } from '../../Utility';
import axios from 'axios';

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders, unread, numbers) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders, 
        unread, 
        numbers
    }
}

export const fetchOrderFail = error => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const updateOrders = (orders, unread, numbers) => {
    return{
        type: actionTypes.UPDATE_ORDERS,
        orders,
        unread,
        numbers
    }
}

export const filterValue = (value) => {
    return {
        type: actionTypes.FILTER_VALUE,
        value
    }
}

export const changeFilterValue = (value) => {
    return dispatch => {
        dispatch(filterValue(value));
    }
}

export const toggleSearch = prevState => {
    return {
        type: actionTypes.TOGGLE_SEARCH,
        toggle: !prevState
    }
}

const searchStart = () => ({type: actionTypes.SEARCH_START});

const searchSuccess = (results) => {
    return{
        type: actionTypes.SEARCH_SUCCESS,
        results
    }
}
const searchFail = message => {
    return{
        type: actionTypes.SEARCH_FAIL,
        message
    }
}

export const onUpdateSearchResults = (searchQuery, searchList) => {
    return dispatch => {
        dispatch(searchStart());
        const results = [];
        const error = `"${searchQuery}" does not exist!`;
        if(searchQuery === '' || searchQuery === null){
            dispatch(fetchOrders(null));
        }
        if(searchList){
            searchList.forEach(element => {
                if(element.data.name.toLowerCase().includes(searchQuery)){
                    results.push(element);
                    return element;
                }
            });
        }
        if(results.length > 0){
            dispatch(searchSuccess(results));
        }else{
            dispatch(searchFail(error));
        }
    }
}

export const update = (orders) => {
    return dispatch => {
        const arr = [];
        const ur = [];
        firebase.database().ref().once('value')
        .then(data => {
            const obj = data.child('/orders').val();
            for(let key in obj){
                if(obj[key].read.read === false){
                ur.push(obj[key]);
                }
                arr.push({id: key, data: obj[key]});
            }
            if(( orders && JSON.stringify(orders) !== JSON.stringify(arr))){
                dispatch(updateOrders(arr, ur, getNumbers(arr)));
            }      
        });
    }
}

export const fetchOrders = (prevOrders) => {
    return dispatch => {
        if(prevOrders === null){
            dispatch(fetchOrdersStart());
        }
        
        const unread = [];
        const orderArray = [];
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            console.log(response.data);
            for(let key in response.data){
                // console.log('MOre tests: ' + response.data[key]);
                if(response.data[key].read.read === false){
                  unread.push(response.data[key]);
                }
                orderArray.push({id: key, data: response.data[key]});
                console.log(orderArray);
            }
            dispatch(fetchOrdersSuccess(orderArray, unread, getNumbers(orderArray)));
        })
        .catch(err => dispatch(fetchOrderFail(err.message)));
    }
}