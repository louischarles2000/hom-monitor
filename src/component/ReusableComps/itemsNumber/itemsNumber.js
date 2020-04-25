import React from 'react';

import cssClasses from './itemsNumber.css';

const ItemsNumber = props => {
    let classes = cssClasses.Item;
    if(props.children === 0){
        classes = cssClasses.NoItem
    }
    return(
        <div className={classes} onClick={props.clicked}>
            <p>{props.children}</p>
        </div>
    )
}

export default ItemsNumber;