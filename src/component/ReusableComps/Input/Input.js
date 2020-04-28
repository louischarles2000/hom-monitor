import React from 'react';
import cssClasses from './Input.css';

const input = props => {
    const classes = [cssClasses.Input];
    if(!(props.valid && props.shouldValidate && props.touched)){
        if(props.touched){
            classes.push(cssClasses.Invalid);
        }
    }
    let inputElement = null;
    switch(props.inputType){
        case 'textarea':
        inputElement = (
            <textarea
                onChange={props.changed}
                rows="4" 
                placeholder={props.placeholder} 
                className={classes.join(' ')}
                value={props.value}/>
        );
        break;
        case 'select':
        inputElement = (
            <select
                className={classes.join(' ')} 
                value = {props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
        break;

        default:
            inputElement = (
                <input 
                    onChange={props.changed}
                    type={props.inputType} 
                    placeholder={props.placeholder} 
                    className={classes.join(' ')}
                    value={props.value}/>
            );
            break;      
    }
    return inputElement;
}
export default input;