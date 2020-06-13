import React from 'react';

import classes from './SummaryBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

const SummaryBtn = props => {
    return(
        <div className={classes.SummaryBtn} onClick={props.clicked}>
            <FontAwesomeIcon icon={faCalendarWeek} /> Week
        </div>
    );
}

export default SummaryBtn;