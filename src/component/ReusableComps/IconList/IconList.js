import React from 'react';

import cssClasses from './IconList.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faArrowLeft, faEnvelopeOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon/Icon';

const IconList = props => {
    return(
        <div className={cssClasses.IconList}>
            {props.icons.map(icon => (
                <Icon key={icon.text} icon={icon.name} text={icon.text} clicked={icon.clicked}/>
            ))}
        </div>
    );
};

export default IconList;