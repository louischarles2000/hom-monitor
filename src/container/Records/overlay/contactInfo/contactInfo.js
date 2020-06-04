import React from 'react';

import classes from './contactInfo.css';

const ContactInfo = props => {
    return(
        <div className={classes.ContactInfo}>
            <div className={classes.cont}>
                <h3>Contact <span>{props.name}</span> via these details;</h3>
                <div className={classes.Email}>
                    <p>Email: </p>
                    <p>{props.email}</p>
                </div>
                <div className={classes.Number}>
                    <p>Number: </p>
                    <p>{props.number}</p>
                </div>
                <div className={classes.Buttons}>
                    <button className={classes.cancel} onClick={props.cancel}>Cancel</button>
                    <button className={classes.done} onClick={props.done}>Done</button>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;