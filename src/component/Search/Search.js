import React from 'react';
import { connect } from 'react-redux';

import classes from './Search.css';
import Input from '../ReusableComps/Input/Input';
import * as actionCreators from '../../Store/actions/orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import MoreList from '../MoreList/MoreList';

const Search = props => {
    const onSearchHandler = () => {
        props.onSearch(props.search.toLowerCase(), props.orders);
    }
    const onChangeHandler = event => {
        if(event.target.value){
            props.onChangeFilterValue(event.target.value);
            props.onSearch(event.target.value.toLowerCase(), props.orders);
        }
        console.log(props.searchList)
    }
    const onToggle = () => {
        props.onToggleSearch(props.toggleSearch)
    }

    const search = (
        <div className={classes.Search}>
            <div className={classes.ToggleSearch} onClick={onToggle}>
                 <FontAwesomeIcon icon={faArrowAltCircleRight}/>
            </div>
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
    const list = [
        {text: "Search messages", icon: faSearch, func: onToggle},
        {text: "Admin accounts", icon: faUser, func: onToggle}
    ]
    return(
        <div className={classes.rightSec}>
            {props.toggleSearch ? search : <MoreList listElements={list}/>}
        </div>
        
    );
}

const mapStateToProps = state => {
    return{
        searchList: state.orders.searchList,
        orders: state.orders.orders,
        search: state.orders.search,
        toggleSearch: state.orders.toggleSearch
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onChangeFilterValue: value => dispatch(actionCreators.changeFilterValue(value)),
        onSearch: (query, list) => dispatch(actionCreators.onUpdateSearchResults(query, list)),
        onToggleSearch: (prevState) => dispatch(actionCreators.toggleSearch(prevState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);