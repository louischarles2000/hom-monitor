import React from 'react';

import classes from './addRecord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddRecord = props => {
    return(
        <div className={classes.AddRecord}>
            <h3>Add transaction records</h3>
            <textarea rows="6" placeholder="Add notes here.."/>
            <div className={classes.addBtn}>
                <button onClick={props.add}><FontAwesomeIcon icon={faPlusCircle} /> Add</button>
                <button onClick={props.cancel}>Cancel</button>
            </div>
        </div>
    );
}

export default AddRecord;