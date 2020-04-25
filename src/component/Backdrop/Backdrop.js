import React from 'react';
import cssClasses from './Backdrop.css';

const Backdrop = props => <div className={props.show ? cssClasses.Backdrop : cssClasses.Remove} onClick={props.clicked}></div>;

export default Backdrop;
