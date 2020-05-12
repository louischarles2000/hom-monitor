import React, { useEffect } from 'react';
import cssClasses from './Home.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';
// import { getNumbers } from '.././../Utility';
import NumbersPanel from '../../component/ReusableComps/numbersPanel/numbersPanel';

const Home = props => {
    useEffect(() => {
        props.reload();  
    }, []);
    let messages;
    if(props.orders){
        messages = <Messages orders={props.orders} reload={props.reload}/>
        if(props.orders.length === 0){
            messages = <Empty />;
        }
    }
    if(props.loading){
        messages = <Spinner />;
    }
    if(props.error){
        messages = <Notify type="danger">{props.error}</Notify>
    }

    return(
        <div className={cssClasses.Home}>
            <NumbersPanel heading="Home" numbers={props.numbers}/>
            {messages}
        </div>
    );
};


export default Home;