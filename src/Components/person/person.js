import React, {useState} from 'react';
import classes from './person.css';

import Pic from './pic/pic';
import GoOutPrompt from '../goOutPrompt/goOutPrompt';
const Person = props => {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const toggle = () => {
        setShow(true);
        if(show){
            setShow(false)
        }
    }
    const onChangeHandler = event => {
        event.preventDefault();
        const text = event.target.value;
        setReason(text);
    }
    let cssClasses = [classes.drop, ''];
    if(show){
        cssClasses = [classes.drop, classes.showReason]
    }
    return(
        <div className={classes.Person}>
            <div className={classes.detail}>
                <Pic img={props.img}/>
                <p>{props.name}</p>
                <p>{props.reason ? 'Reason:  ' + props.reason : null}</p>
            </div>
            <div className={classes.Btn}>
                <button disabled={show} onClick={toggle}>Go out</button>
            </div>
            <div className={cssClasses.join(' ')}>
                <GoOutPrompt 
                    id={props.id} 
                    cancel={toggle} 
                    done={toggle} 
                    reason={reason} 
                    reload={props.reload}
                    changed={onChangeHandler}/>
            </div>
            
        </div>
    );
}

export default Person;