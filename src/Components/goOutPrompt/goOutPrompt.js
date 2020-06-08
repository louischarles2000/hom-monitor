import React, {useState} from 'react';

import classes from './goOutPrompt.css';
import * as firebase from 'firebase';

const goOutPrompt = props => {
    const [error, setError] = useState(null);
    console.log(props.reason);
    const onClickDoneHandler = () => {
        const date = new Date();
        const time = {
            minutes: date.getMinutes(),
            hours: date.getHours(),
            date: date.getDate(),
            month: date.getUTCMonth() + 1
        }
        firebase.database().ref().child(`/people/${props.id}/`).update({reason: props.reason, out: true, timeOut: time})
        .then(
            // props.reload()
            console.log('Damnnn IT WORKED')
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
                <button className={classes.done} onClick={onClickDoneHandler}>Done</button>
                <button className={classes.cancel} onClick={props.cancel}>Cancel</button>
            </div>
            
        </div>
    );
}

export default goOutPrompt;