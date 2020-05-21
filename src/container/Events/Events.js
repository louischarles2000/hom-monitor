import React, { Component } from 'react';
import cssClasses from './Events.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';
import { getNumbers } from '../../Utility';
import NumberPanel from '../../component/ReusableComps/numbersPanel/numbersPanel';

class Events extends Component {
    render(){
        let classes = [cssClasses.Events, '']
        let messages;
        let numbers = null;
        if(this.props.orders !== null){
            const arr = this.props.orders.filter(el => el.data.service === 'events');
            messages = <Messages orders={arr} reload={this.props.reload}/>
            numbers = {
                ...this.props.numbers,
                ...getNumbers(arr)
            }
            // console.log();
            if(arr.length === 0){
                messages = <Empty />;
            }
        }
        if(this.props.loading){
            messages = <Spinner />;
        }
        if(this.props.error){
            messages = <Notify type="danger">{this.props.error}</Notify>
        }
        return (
            <div className={classes.join(' ')}>
                <NumberPanel heading="Events" numbers={numbers}/>
                {messages}
            </div>
        );
    }
};
export default Events;