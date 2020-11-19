import React from 'react';

import classes from './Record.css';
import { time, getTimeSpent } from '../../utility/people';

const Record = props => {
    const now = new Date();
    console.log('time' + now.getTime())
   
    let date;
    date = (props.timeOut.date.toString().length === 1 ? '0' + props.timeOut.date : props.timeOut.date) + '/ ' +(props.timeOut.month.toString().length === 1 ? '0' +  props.timeOut.month :  props.timeOut.month )+ '/ ' + props.timeOut.year;
    return(
        <div className={classes.Record}>
            <p><span>{props.name}</span> went out <span>{(props.timeOut.date === now.getDate()) && (props.timeOut.month === now.getUTCMonth() + 1) ? 'today' : date}</span  >.<br/>
            Reason : <span>{props.reason}</span></p>
            <hr />
            <p>Left home <span>{(props.timeIn.date === props.timeOut.date) ? 'at ' + time(props.timeOut) : 'on ' + date + ' at ' + time(props.timeOut)}</span> and came back at <span>{time(props.timeIn)}</span>.</p>
            <p>he/she spent approximately <span>{getTimeSpent(props.timeOut, props.timeIn)}</span>.</p>
        </div>
    );
}

export default Record;