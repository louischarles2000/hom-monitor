import * as actionTypes from '../actionTypes';
import { updateObject } from '../../Utility';

const initialState = {
    orders: null,
    loading: false, 
    error: null,
    unread: null, 
    numbers: null,
    search: '',
    searchList: null,
    toggleSearch: false
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
        unread: action.unread,
        numbers: action.numbers
    });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {error: action.error});
};

const updateOrders = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
        unread: action.unread,
        numbers: action.numbers
    })
}

const toggleSearch = (state, action) => {
    return updateObject(state, {toggleSearch: action.toggle});
}

const filterValue = (state, action) => {
    return updateObject(state, {search: action.value});
}

const searchStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const searchSuccess = (state, action) => {
    return updateObject(state, {loading: false, orders: action.results, error: null});
}

const searchFail = (state, action) => {
    console.log(action.message);
    return updateObject(state, {loading: false, error: action.message, search: ''});
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        case actionTypes.UPDATE_ORDERS: return updateOrders(state, action);
        case actionTypes.FILTER_VALUE: return filterValue(state, action);
        case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
        case actionTypes.SEARCH_FAIL: return searchFail(state, action);
        case actionTypes.TOGGLE_SEARCH: return toggleSearch(state, action);
        default: return state;
    }
};


export default reducer;