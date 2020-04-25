import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Panel from '../ReusableComps/panel/panel';
import cssClasses from './MessageBody.css';
import Spinner from '../Spinner/Spinner';

const MessageBody = props => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        // console.log(props.location.search);
        const id = props.location.search.split('=').pop();
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            for(let key in response.data){
                if(key === id){
                    setDetails(response.data[key]);
                }
                // orderArray.push({id: key, data: response.data[key]});
            }
            setLoading(false);
        }).catch(err => this.setState({loading: false, error: err}));
    }, []);

    let body;
    if(loading){
        body = <Spinner />;
    }
    if(details){
        body = (
            <div className={cssClasses.Container}>
                <div className={cssClasses.head}>
                    <p>{details.service} : {details.subject}</p>
                        <p>Phone: {details.phone}</p>
                    <div className={cssClasses.Details}>
                        <p>{details.name}<span> - {details.email}</span></p>
                        <p>{details.time}</p>
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
            <Panel clicked={() => props.history.goBack()}/>
            {body}
            {/* <a href= "louischarles.2000@gmail.com">louischarles.2000@gmail.com</a> */}
        </div>
    );
};
export default withRouter(MessageBody);