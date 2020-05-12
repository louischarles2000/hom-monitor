import React from 'react';
import { connect } from 'react-redux';

import classes from './Search.css';
import Input from '../ReusableComps/Input/Input';
import * as actionCreators from '../../Store/actions/orders';
// import Button from '../ReusableComps/Button/Button';

const Search = props => {
    const onSearchHandler = () => {
        // console.log(props.orders);
        props.onSearch(props.search.toLowerCase(), props.orders);
    }
    const onChangeHandler = event => {
        if(event.target.value){
            props.onChangeFilterValue(event.target.value);
        }
        props.onSearch(props.search.toLowerCase(), props.orders);
        // console.log(event.target.value);
        // console.log(props.search);
    }
    return(
        <div className={classes.Search}>
            <div className={classes.SearchBar}>
                <Input 
                    type="text" 
                    placeholder="search" 
                    changed={event => onChangeHandler(event)}/>
            </div>
            <div className={classes.SearchBtn}>
                <button onClick={onSearchHandler}>Search</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        orders: state.orders.orders,
        search: state.orders.search
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onChangeFilterValue: value => dispatch(actionCreators.changeFilterValue(value)),
        onSearch: (query, list) => dispatch(actionCreators.onUpdateSearchResults(query, list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);