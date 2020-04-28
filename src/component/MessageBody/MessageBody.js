import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as firebase from 'firebase';

import Panel from '../ReusableComps/panel/panel';
import cssClasses from './MessageBody.css';
import Spinner from '../Spinner/Spinner';
import { getTime } from '../../Utility';
import Notify from '../ReusableComps/Note/notify/notify';

const MessageBody = props => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [showNotify, setShowNotify] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [orderId, setOrderId] = useState();
    useEffect(() => {
        setLoading(true);
        // console.log(props.location.search);
        const id = props.location.search.split('=').pop();
        setOrderId(id);
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            for(let key in response.data){
                if(key === id){
                    setDetails(response.data[key]);
                }
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err.message);
        });
    }, []);
    const unReadMessageHandler = () => {
        if(orderId){
            firebase.database().ref().child(`orders/${orderId}/read/`).update({read: false})
            .then(() => props.history.goBack());
        }
       
    }
    const removeMessageHandler = () => {
        setDeleteMessage(true);
        if(orderId){
            setShowNotify(true);
            firebase.database().ref().child(`orders/${orderId}`).remove()
            .then(() => {
                setDeleteMessage(false);
                setShowNotify(false);
                props.history.goBack();
            });
        }
    }
    let body;
    let notify = '';
    if(loading){
        body = <Spinner />;
    }
    if(showNotify){
        notify = <Notify type="danger">Deleting...</Notify>
    }
    if(deleteMessage){
        notify = <Notify type="danger">Failed to delete!</Notify>
    }
    if(error){
        notify = <Notify type="danger">{error}</Notify>
    }
    if(details){
        const date = details.date;
        let t = (date.hours > 12) ? 'PM' : 'AM';
        const clock = (date.hours > 12 ? date.hours - 12 : date.hours) + ':' + (date.minutes < 10 ? '0' + date.minutes : date.minutes)+ ' ' + t;
        const time = getTime(date.year, date.month, date.date, date.hours, date.minutes) + ', ' + date.year + ', ' + clock;
        body = (
            <div className={cssClasses.Container}>
                <div className={cssClasses.head}>
                    <p>{details.service} : {details.subject}</p>
                    <p>Phone: {details.phone}</p>
                    <div className={cssClasses.Details}>
                        <p>{details.name}<span> - {details.email}</span></p>
                        <p>{time}</p>
                    </div>
                </div>
                <div className={cssClasses.Message}>
                    <p>{details.message}</p>
                </div>
            </div>
        );
    }
      
    return(
        <div className={cssClasses.MessageBody}>
            <Panel 
                clicked={() => props.history.goBack()} 
                remove={removeMessageHandler} 
                unreadHandler={unReadMessageHandler}/>
            {notify}
            {body}
        </div>
    );
};
export default withRouter(MessageBody);