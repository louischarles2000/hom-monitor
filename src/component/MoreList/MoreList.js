import React, { useState } from 'react';

import classes from './MoreList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGripVertical } from '@fortawesome/free-solid-svg-icons';

const MoreList = props => {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    }
    return(
        <div className={classes.MoreList} onClick={toggleShow}>
            <FontAwesomeIcon icon={faGripVertical} />
            {show ?
            <div className={classes.List}>
            {props.listElements.map(el => (
                <div onClick={el.func} key={el.text}>
                    <p><span><FontAwesomeIcon icon={el.icon}/></span>{' ' + el.text }</p>
                </div>
            ))}
        </div> : null}
        </div>
    );
}

export default MoreList;