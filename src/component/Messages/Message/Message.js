import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';
import { faTrash, faEnvelopeOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase';

import cssClasses from './Message.css';
import { getTime, textLength} from '../../../Utility';
import IconList from '../../ReusableComps/IconList/IconList';
// import Notify from '../../ReusableComps/Note/notify/notify';

const Message = props => {
    const [showIcons, setShowIcons] = useState(false);
    const [remove, setRemove] = useState(false);
    const [read, setRead] = useState(false);
 
    let classes = [cssClasses.time, cssClasses.show];
    //Mouse Hover functions...
    const mouseHoverHandler = () => {
        setShowIcons(true);
        classes = [cssClasses.time, cssClasses.remove];
    }
    const mouseoutHandler = () => {
        setShowIcons(false);
        classes = [cssClasses.time, cssClasses.show];
    }
    const readMessageHandler = () => {
        firebase.database().ref().child(`orders/${props.id}/read/`).update({read: true})
        .then(() => {
            setRead(true);
            props.reload();
        })
    }
    const unReadMessageHandler = () => {
        firebase.database().ref().child(`orders/${props.id}/read/`).update({read: false})
        .then(() => {
            setRead(false);
            props.reload();
        })
    }
    const removeMessageHandler = () => {
        props.show();
        firebase.database().ref().child(`orders/${props.id}`).remove()
        .then(() => {
            props.remove();
            setRemove(true);
            props.reload();
        })
        .catch(err =>  {
            props.remove();
            props.fail();
            setTimeout(() => {
                props.remove();
            }, 2000);
        });
    }

    let icons = [
        {
            name: faEnvelopeOpen, 
            text: 'Mark as read', 
            clicked:  readMessageHandler},
        {
            name: faTrash, 
            text: 'Delete', 
            clicked: removeMessageHandler}
    ];

      const onClickHandler = () => {
          readMessageHandler();
        // props.history.push(`/message?id=${props.id}&unreadMethod=${unReadMessageHandler}`);
        props.history.push(`/message?id=${props.id}`);
    }
    let messageCss = [cssClasses.Message, ''];
    let messageComponent;
    let readStatus = [cssClasses.container, cssClasses.unread];
    if(props.read.read || read){
        readStatus = [cssClasses.container, ''];
        icons = [
            {
                name: faEnvelope, 
                text: 'Mark as unread', 
                clicked:  unReadMessageHandler},
            {
                name: faTrash, 
                text: 'Delete', 
                clicked: removeMessageHandler}
        ];
    }
    if(remove){
        messageCss = [cssClasses.Message, cssClasses.Remove];
        messageComponent = <div className={cssClasses.Delete}></div>
    }else{
        messageComponent = (
            <div className={messageCss.join(' ')}onMouseOver={mouseHoverHandler} onMouseOut={mouseoutHandler}>
                <div className={readStatus.join(' ')}>

                    <div className={cssClasses.heading} onClick={onClickHandler} >
                        <p>{props.name}</p>
                    </div>
                    <div className={cssClasses.group}  onClick={onClickHandler} >
                        <div className={cssClasses.service}>
                            <p>{props.service} : {props.subject}</p>
                        </div>
                        <div className={cssClasses.message}>
                            <p>- {textLength(props.message)}</p>
                        </div>
                    </div>
                    {showIcons ? <div className={cssClasses.Icons}>
                                    <IconList icons={icons}/>
                                </div> :
                    <div className={classes.join(' ')}>
                        <p>{getTime(
                            props.time.year,
                            props.time.month,
                            props.time.date,
                            props.time.hours,
                            props.time.minutes
                            )}</p>
                    </div>}
                </div>
            </div>
        );
    };
    return messageComponent;
}

export default withRouter(Message);