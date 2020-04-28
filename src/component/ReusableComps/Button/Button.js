import React from 'react';

import cssClasses from './Button.css';
const button = props => <button className={cssClasses.Button} disabled={props.disabled} onClick={props.clicked}>{props.children}</button>
export default button;