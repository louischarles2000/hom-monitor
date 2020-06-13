import React from 'react';
import classes from './element.css';

const element = props => (
    <div className={classes.element}>
        <p>Out at <span>2:04pm, 11/06/2020</span> spent <span>2 hrs</span></p>
        <p><span>Reason:</span> {props.data.reason} </p>
    </div>
);
export default element;