import React from 'react';
import img from './Logo.png';
import classes from './logo.css';

const Logo = () => {
    return(
        <div className={classes.Logo}>
            <img src={img} alt="Wellsprings Connections" />
        </div>
    );
}

export default Logo;