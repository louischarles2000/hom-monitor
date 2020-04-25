import React from 'react';
import { withRouter } from 'react-router-dom';
import { faTrash, faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import cssClasses from './panel.css';
import IconList from '../IconList/IconList';
import Icon from '../IconList/Icon/Icon';
const Panel = props => {
    const icons = [
        {name: faEnvelope, text: 'Mark as unread', clicked: () => console.log('clicked')},
        {name: faTrash, text: 'Delete', clicked: () => console.log('clicked')}
    ];
    return(
        <div className={cssClasses.Panel}>
            <div className={cssClasses.Back}>
                <Icon icon={faArrowLeft} text="Back" clicked={props.clicked}/>
            </div>
            <div className={cssClasses.Options}>
                <IconList icons={icons}/>
            </div>
        </div>
    );
};

export default (Panel);