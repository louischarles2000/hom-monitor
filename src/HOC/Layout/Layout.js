import React, { Component } from 'react';

import classes from  './Layout.css';
import NavigationItems from '../../component/NavigationItems/NavigationItems';
import Backdrop from '../../component/Backdrop/Backdrop';
const burgers = require('react-animated-burgers');
class Layout extends Component{
    state = {
        showManu: false
    }

    toggleShowManuHandler = () => {
        this.setState(presState => {
            return{
                showManu: !presState.showManu
            };
        });
    }
    bcakDropHandler = () => {
        this.setState({showManu: false})
    }
    render(){
        let position;
        let cssClasses;
        if(this.state.showManu){
            position = {
                right: '10px'
            };

            cssClasses = [classes.Dashboard, classes.Open]
        }else{
            position = {
                left: '1%'
            };

            cssClasses = [classes.Dashboard, classes.Close]
        };

        return(
            <div className={classes.Layout}>
                    <burgers.HamburgerArrow 
                        isActive={this.state.showManu}
                        toggleButton={this.toggleShowManuHandler}
                        barColor="rgb(21, 156, 156)" 
                        buttonStyle={
                            { 
                                ...position,
                                position: 'fixed',
                                border: 'none',
                                outline: 'none',
                                zIndex: 998
                                }}/>
               
                <Backdrop show={this.state.showManu} clicked={this.toggleShowManuHandler}/>
                <div className={cssClasses.join(' ')}>
                    <NavigationItems clicked={this.bcakDropHandler} unread={this.props.unread} reload={this.props.reload}/> 
                </div>
                <main>
                    <div className={classes.Header}>
                        <div className={classes.Heading}>
                            <h1>WELLSPRINGS ADMIN</h1>
                        </div>
                    </div>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;