import React, { useState } from 'react';

import classes from './PersonOut.css';
import Pic from '../pic/pic';
import * as firebase from 'firebase';
import axios from 'axios';

const PersonOut = props => {
    const [error, setError] = useState(null);
    const [welcome, setWelcome] = useState(false);
    console.log(props.timeOut);
    const dates = new Date();
    const date = {...props.timeOut}
    let t = (date.hours > 12) ? 'PM' : 'AM';
    const clock = (date.hours > 12 ? date.hours - 12 : date.hours) + ':' + (date.minutes < 10 ? '0' + date.minutes : date.minutes)+ ' ' + t;
    const timeIn = {
        minutes: dates.getMinutes(),
        hours: dates.getHours(),
        date: dates.getDate(),
        month: dates.getUTCMonth() + 1,
        year: dates.getFullYear()
    }
    const onBackHomeHandler = () => {
        firebase.database().ref().child(`/people/${props.id}/`).update({reason: '', out: false, timeIn: timeIn})
        .then(() => {
            setWelcome(true);
            console.log('Damnnn IT WORKED')
        }
        ).catch(err => setError('Network problem, please refresh page'));
        const data = {name: props.name, reason: props.reason, timeOut: props.timeOut, timeIn}
        axios.post('https://home-c153e.firebaseio.com/records.json', data)
        .then(resp => {
            setTimeout(() => {
                setWelcome(false);
                props.reload()
            }, 1000);
        })
    }
    return (
        <div className={classes.PersonOut}>
            <div className={classes.Person}>
                <Pic img={props.img}/>
                <p>{props.name}</p>
                <p>out at: <span>{clock}</span></p>
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
                {localStorage.getItem('currentUser') ? <button onClick={onBackHomeHandler}>Back home</button> : null}
            </div>
        </div>
    );
}

export default PersonOut;