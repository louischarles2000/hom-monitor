import React from 'react';

import cssClasses from './empty.css';
import img from './empty.png';

const Empty = props => (
    <div className={cssClasses.Empty}>
        <div className={cssClasses.container}>
            <img src={img} alt="NO MESSAGES" />
        </div>
        <p>{props.text ? props.text : 'THERE ARE NO MESSAGES HERE YET!!'}</p>
    </div>
);

export default Empty;