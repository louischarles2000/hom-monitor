import React, { useState } from 'react';

import cssClasses from './Messages.css';
import Message from './Message/Message';
import Notify from '../ReusableComps/Note/notify/notify';

const Messages = props => {
    const [show, setShow] = useState(false);
    const [fail, setFail] = useState(false);
    let messages;
    let classes = [cssClasses.Messages, cssClasses.Remove]
    if(props.orders.length >= 11){
        classes = [cssClasses.Messages, '']
    }
    const notifyHandler = () => {
        setShow(true);
    }
    const removeNotify = () => {
        setShow(false);
        setFail(false);
    }
    const failHandler = () => {
        setFail(true);
    }
    let notify = '';
    if(props.orders !== null){
        messages = props.orders.reverse().map(order => (
                <Message 
                    key={order.id}
                    name={order.data.name}
                    service={order.data.service}
                    subject={order.data.subject}
                    message={order.data.message}
                    time={order.data.date}
                    read={order.data.read}
                    number={order.data.phone}
                    id={order.id}
                    show={notifyHandler}
                    remove={removeNotify}
                    fail={failHandler}
                    reload={props.reload}/>
        ));
    }else{
        messages = <p>THERE ARE NO MESSAGES YET</p>
    }
    if(show){
        notify = <Notify type="danger">Deleting...</Notify>
    }
    if(fail){
        notify = <Notify type="danger">Failed to delete!</Notify>
    }
    return(
        <div className={classes.join(' ')}>
            {notify}
            {messages}
        </div>
    );
}

export default Messages;   