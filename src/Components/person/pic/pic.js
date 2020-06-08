import React from 'react';

import classes from './pic.css'
import img from './Louis-Logo.png';

const Pic = props => (
    <div className={classes.Pic}>
        <img src={props.img} alt="Person" />
    </div>
);

export default Pic;