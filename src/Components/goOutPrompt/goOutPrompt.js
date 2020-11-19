import React, {useState} from 'react';

import classes from './goOutPrompt.css';
import * as firebase from 'firebase';
import Spinner from '../tinySpinner/spinner';

// import { getTime } from '../../utility/people';

const goOutPrompt = props => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [test, setTest] = useState(false);
    console.log(props.reason);

    const onClickDoneHandler = () => {
        setError(null);
        setLoading(true);
        setDisabled(true);
        const dates = new Date();
        const date = {
            minutes: dates.getMinutes(),
            hours: dates.getHours(),
            date: dates.getDate(),
            month: dates.getUTCMonth() + 1,
            year: dates.getFullYear()
        }
        // let t = (date.hours > 12) ? 'PM' : 'AM';
        // const clock = (date.hours > 12 ? date.hours - 12 : date.hours) + ':' + (date.minutes < 10 ? '0' + date.minutes : date.minutes)+ ' ' + t;
        // const time = getTime(date.year, date.month, date.date, date.hours, date.minutes) + ', ' + date.year + ', ' + clock;
        // console.log(clock);
        firebase.database().ref().child(`/people/${props.id}/`).update({reason: props.reason, out: true, timeOut: date})
        .then(() => {
            setLoading(false);
            props.reload();
            setTest(true);
            console.log('Damnnn IT WORKED')
        }
        ).catch(err => {
            setLoading(false);
            setError('Network problem, try refreshing the page');
            setDisabled(false)
        });
        setTimeout(() => {
            if(!test){
                setLoading(false);
                setDisabled(false);
                setError('Network problem, Resend or try refreshing the page');
            }
         
        }, 20000);
    }
    let spin = '';
    if(loading){
        spin = <Spinner />
    }
    return(
        <div className={classes.goOutPrompt}>
            <p>Reason for going out:</p>
            <textarea type="text" placeholder="Reason.." rows="3" onChange={event => props.changed(event)} />
            {spin}
            <div className={classes.error}>
                <p>{error ? error : null}</p>
            </div>
            <div>
                <button disabled={props.reason === '' || disabled} className={classes.done} onClick={onClickDoneHandler}>Done</button>
                <button className={classes.cancel} onClick={props.cancel}>Cancel</button>
            </div>
            
        </div>
    );
}

export default goOutPrompt;