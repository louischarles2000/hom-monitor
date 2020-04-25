import React, { Component } from 'react';

// import cssClasses from './Staionary.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';
import { getNumbers } from '../../Utility';
import NumberPanel from '../../component/ReusableComps/numbersPanel/numbersPanel';

class Textile extends Component{
    render(){
        let messages;
        let numbers = null;
        if(this.props.orders !== null){
            const arr = this.props.orders.filter(el => el.data.service === 'textile');
            // console.log(this.props.orders + 'orders');
            messages = <Messages orders={arr}/>
            numbers = {
                ...this.props.numbers,
                ...getNumbers(arr)
            }
            if(arr.length === 0){
                messages = <Empty />;
            }
        }
        
        if(this.props.loading){
            messages = <Spinner />;
        }
        if(this.props.error){
            messages = <Notify type="danger">{this.props.error.message}</Notify>
        }
        return (
            <div>
                <NumberPanel heading="Textile and Design" numbers={numbers}/>
                {messages}
            </div>
        );
    }
}

export default Textile;
