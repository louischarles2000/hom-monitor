import React from 'react';

import cssClasses from './numbersPanel.css';

const numbersPanel = props => {
    let messages = 0, read = 0, unread = 0;
    if(props.numbers){
        messages = props.numbers.overAllNumber;
        read = props.numbers.numberOfRead;
        unread = props.numbers.numberOfUnread;
    }
    return(
        <div className={cssClasses.Top}>
            <div className={cssClasses.heading}>
                <h2>{props.heading}:</h2>
            </div>
            
            <div className={cssClasses.numbers}>
                <p>Messages: <span className={cssClasses.all}>{messages}</span></p>
                <p>Read: <span className={cssClasses.read}>{read}</span></p>
                <p>Unread: <span className={cssClasses.unread}>{unread}</span></p>
            </div>
        </div>
    );
}

export default numbersPanel;