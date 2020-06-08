import React, { useState } from 'react';

import classes from './Customer.css';
import ContactInfo from '../../container/Records/overlay/contactInfo/contactInfo';
import AddRecord from '../../container/Records/overlay/addRecord/addRecord';
const Customer = props => {
    console.log('It is working');
    const [show, setShow] = useState(false);
    const [drop, setDrop] = useState(false);
    const onclickHandler = () => {
        setShow(true);
    }
    const onCancelHandler = () => {
        setShow(false);
    }
    const onAddRec = () => {
        setDrop(true);

        if(drop){
            setDrop(false);
        }
    }
    let cssClasses = [classes.AddRec, ''];
    if(drop){
        cssClasses = [classes.AddRec, classes.showAddRec]
    }
    return(
        <div className={classes.Customer}>
            <div className={classes.top}>
                <div className={classes.Details}>
                    <h4>{props.details.name}</h4>
                    <div className={classes.service}>
                        <p>{props.details.service}</p>
                    </div>
                </div>
                <div className={classes.Btn}>
                    {props.contacted ?
                        <button add onClick={onAddRec} disabled={drop}>Add Record</button>
                        : <button contact onClick={onclickHandler}>Contact now</button>}
                </div>
            </div>
            
            <div className={cssClasses.join(' ')}>
                <AddRecord cancel={onAddRec}/>
            </div>
            
            <div className={classes.info}>
                {show ?<ContactInfo 
                    name={props.details.name}
                    email={props.details.email}
                    number={props.details.number}
                    cancel={onCancelHandler}/> : null}
            </div>
            
        </div>
    );
}

export default Customer;