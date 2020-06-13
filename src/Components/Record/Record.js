import React from 'react';

import classes from './Record.css';

const Record = props => {
    const now = new Date();
    const getTime = (time) => {
        const date = {...time}
        let t = (date.hours > 12) ? 'PM' : 'AM';
        const clock = (date.hours > 12 ? date.hours - 12 : date.hours) + ':' + (date.minutes < 10 ? '0' + date.minutes : date.minutes)+ ' ' + t;
        return clock;
    }
    const getTimeSpent = (timeOut, timeIn) => {
        let time;
        if(timeOut.month === timeIn.month){
            // console.log('TESTTTTTTTTTTTTTT')
            if(timeOut.date === timeIn.date){
                if(timeOut.hours === timeIn.hours){
                    time = timeIn.minutes - timeOut.minutes + 'mins';
                    return time
                }else if(timeOut.hours < timeIn.hours){
                    time = timeIn.hours - timeOut.hours + 'hr and ' + timeIn.minutes + 'mins'
                    return time
                }
            } else {
                console.log('TESTTTTTTTTTTTTTT');
                time = timeIn.date - timeOut.date + ' days';
                return time;
            }
        }
        // return time;
    }
    let date, timeSpent;
    date = (props.timeOut.date.toString().length === 1 ? '0' + props.timeOut.date : props.timeOut.date) + '/ ' +(props.timeOut.month.toString().length === 1 ? '0' +  props.timeOut.month :  props.timeOut.month )+ '/ ' + props.timeOut.year;
    return(
        <div className={classes.Record}>
            <p><span>{props.name}</span> went out <span>{(props.timeOut.date === now.getDate()) && (props.timeOut.month === now.getUTCMonth() + 1) ? 'today' : date}</span  >.<br/>
            Reason : <span>{props.reason}</span></p>
            <hr />
            <p>Left home <span>{(props.timeIn.date === props.timeOut.date) ? 'at ' + getTime(props.timeOut) : 'on ' + date + ' at ' + getTime(props.timeOut)}</span> and came back at <span>{getTime(props.timeIn)}</span>.</p>
            <p>he/she spent approximately <span>{getTimeSpent(props.timeOut, props.timeIn)}</span>.</p>
        </div>
    );
}

export default Record;