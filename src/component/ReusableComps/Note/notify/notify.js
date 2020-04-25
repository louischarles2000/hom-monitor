import React from 'react';

import cssClasses from './notify.css';

const Notify = props => {
    let classes = [cssClasses.Error, cssClasses.success];
    if(props.type === 'danger'){
        classes = [cssClasses.Error, cssClasses.danger];
    }
    return (
        <div className={classes.join(' ')}>
            <p>{props.children}</p>
        </div>
    );
}

export default Notify;