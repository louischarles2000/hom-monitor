import React from 'react';
import classes from './element.css';
import { time, writeDate, getTimeSpent} from '../../../../../utility/people';

const element = props => (
    <div className={classes.element}>
        <p>Out at <span>{time(props.data.timeOut)}, {writeDate(props.data.timeOut)}</span> spent <span>{getTimeSpent(props.data.timeOut, props.data.timeIn)}</span></p>
        <p><span>Reason:</span> {props.data.reason} </p>    
    </div>
);
export default element;