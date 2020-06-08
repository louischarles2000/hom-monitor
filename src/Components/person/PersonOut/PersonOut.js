import React from 'react';

import classes from './PersonOut.css';
import Pic from '../pic/pic';

const PersonOut = props => {
    console.log(props.timeOut)
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
            <div className={classes.Btn}>
                <button>Back home</button>
            </div>
        </div>
    );
}

export default PersonOut;