import React from 'react';

import classes from './RecordsList.css';
import Customer from '../../../component/Customer/Customer';
import Spinner from  '../../../component/Spinner/Spinner';
import Notify from '../../../component/ReusableComps/Note/notify/notify';

const RecordsList = props => {
    if(props.list){
        console.log(props.list);
    }
    let list;
    if(props.list){
        list = (
            props.list.map((customer, index) => (
                <Customer 
                    key={customer.name + index} 
                    name={customer.name} 
                    service={customer.service} 
                    contacted={false}
                    />
            ))
        );
    }
    if(props.loading){
        list = <Spinner />
    }
    if(props.error){
        list = <Notify type="danger">{props.error}</Notify>
    }
    return(
        <div className={classes.RecordsList}>
            {list}
        </div>
    );
}

export default RecordsList;