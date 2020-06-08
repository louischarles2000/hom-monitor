import React, { useState } from 'react';

import classes from './PersonOut.css';
import Pic from '../pic/pic';
import * as firebase from 'firebase';

const PersonOut = props => {
    const [error, setError] = useState(null);
    const [welcome, setWelcome] = useState(false);
    console.log(props.timeOut);
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
    
    const onBackHomeHandler = () => {
        firebase.database().ref().child(`/people/${props.id}/`).update({reason: '', out: false, timeIn: clock})
        .then(() => {
            setWelcome(true);
            setTimeout(() => {
                setWelcome(false);
                props.reload()
            }, 2000);
            console.log('Damnnn IT WORKED')
        }
        ).catch(err => setError('Network problem, please refresh page'));
    }
    return (
        <div className={classes.PersonOut}>
            <div className={classes.Person}>
                <Pic img={props.img}/>
                <p>{props.name}</p>
                <p>out at: <span>{props.timeOut}</span></p>
            </div>
            <div className={classes.Reason}>
                <p>Reason for going out:</p>
                <p>> {props.reason}</p>
            </div>
            <div className={classes.error}>
                <p>{error ? error : null}</p>
            </div>
            {welcome ? <div className={classes.welcome}>
                <p>Don't forget to wash your hands!</p>
            </div> : null}
            <div className={classes.Btn}>
                <button onClick={onBackHomeHandler}>Back home</button>
            </div>
        </div>
    );
}

export default PersonOut;