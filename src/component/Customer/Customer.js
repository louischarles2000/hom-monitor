import React from 'react';

import classes from './Customer.css';

const Customer = props => {
    console.log('It is working')
    return(
        <div className={classes.Customer}>
            <div className={classes.Details}>
                <h4>{props.name}</h4>
                <div className={classes.service}>
                    <p>{props.service}</p>
                </div>
            </div>
            <div className={classes.Btn}>
                {props.contacted ?
                    <button add>Add Record</button>
                    : <button contact>Contact now</button>}
            </div>
        </div>
    );
}

export default Customer;