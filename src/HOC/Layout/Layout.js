import React, { Component } from 'react';

import classes from  './Layout.css';
import NavigationItems from '../../component/NavigationItems/NavigationItems';

class Layout extends Component{
    render(){
        return(
            <div className={classes.Layout}>
                <div className={classes.Dashboard}>
                    <NavigationItems /> 
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;