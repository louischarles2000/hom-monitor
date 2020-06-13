import React, { useState } from 'react';
import classes from './summary.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Element from './element/element';

const summary = props => {
    const [drop, setDrop] = useState(false);
    const toggle = () => {
        setDrop(true);
        if(drop){
            setDrop(false);
        }
    }
    let dropCss = [classes.drop, ''];
    if(drop){
        dropCss = [classes.drop, classes.show];
    }
    return (
        <div className={classes.summary}>
            <div className={classes.first} onClick={toggle}>
                <p><span>{props.person.name}</span> got out: <span>{props.person.data.length === 1 ? props.person.data.length + ' time' : props.person.data.length + ' times'}</span></p>
                <p>{drop ? <FontAwesomeIcon icon={faArrowUp}/> : <FontAwesomeIcon icon={faArrowDown}/> }</p>
            </div>
            <hr />
            <div className={dropCss.join(' ')}>
                {
                    props.person.data.map(el => (
                        <Element data={el}/>
                    ))
                }
            </div>
            <p>Total time out is arround <span>4 hrs</span>.</p>
        </div>
    );
}

export default summary;