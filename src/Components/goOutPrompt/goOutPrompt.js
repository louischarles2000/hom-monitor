import React, {useState} from 'react';

import classes from './goOutPrompt.css';
import * as firebase from 'firebase';

import { getTime } from '../../utility/people';

const goOutPrompt = props => {
    const [error, setError] = useState(null);
    console.log(props.reason);
    const onClickDoneHandler = () => {
        const dates = new Date();
        const date = {
            minutes: dates.getMinutes(),
            hours: dates.getHours(),
            date: dates.getDate(),
            month: dates.getUTCMonth() + 1,
            year: dates.getFullYear()
        }
        let t = (date.hours > 12) ? 'PM' : 'AM';
        const clock = (date.hours > 12 ? date.hours - 12 : date.hours) + ':' + (date.minutes < 10 ? '0' + date.minutes : date.minutes)+ ' ' + t;
        // const time = getTime(date.year, date.month, date.date, date.hours, date.minutes) + ', ' + date.year + ', ' + clock;
        console.log(clock);
        firebase.database().ref().child(`/people/${props.id}/`).update({reason: props.reason, out: true, timeOut: date})
        .then(() => {
            props.reload()
            console.log('Damnnn IT WORKED')
        }
        ).catch(err => setError('Network problem, please refresh page'));
    }
    return(
        <div className={classes.goOutPrompt}>
            <p>Reason for going out:</p>
            <textarea type="text" placeholder="Reason.." rows="3" onChange={event => props.changed(event)} />
            <div className={classes.error}>
                <p>{error ? error : null}</p>
            </div>
            <div>
                <button disabled={props.reason === ''} className={classes.done} onClick={onClickDoneHandler}>Done</button>
                <button className={classes.cancel} onClick={props.cancel}>Cancel</button>
            </div>
            
        </div>
    );
}

export default goOutPrompt;