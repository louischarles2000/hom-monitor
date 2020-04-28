import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as firebase from 'firebase';

import classes from './App.css';
import axios from 'axios'
import Layout from './HOC/Layout/Layout';
import Home from './container/Home/Home';
import Events from './container/Events/Events';
import Stationary from './container/Stationary/Stationary';
import Building from './container/Building/Building';
import GenSupply from './container/GenSupply/GenSupply';
import Printing from './container/Printing/Printing';
import Office from './container/Office/Office';
import Textile from './container/Textile/Textile';
import MessageBody from './component/MessageBody/MessageBody';
import Auth from './container/Auth/Auth';
import { getNumbers, updateArray } from './Utility';
import User from './component/User/User';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: null,
      loading: false, 
      error: null,
      unread: null, 
      numbers: null,
      isAuth: null,
      isSignup: false,
      user: null
    }
    
  }

componentDidMount(){
  console.log(firebase.auth().currentUser);
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log('user =====>' + user.email);
      this.setState({user: user.email});
    }else{
      console.log('User is offline')
    }
  })
    this.setState({loading: true});
    this.reloadAppHandler();
}

componentDidUpdate(){
  const arr = [];
  const ur = [];
  firebase.database().ref().once('value')
    .then(data => {
      const obj = data.child('/orders').val();
      for(let key in obj){
        if(obj[key].read.read === false){
          ur.push(obj[key]);
        }
        arr.push({id: key, data: obj[key]});
      }
      if(( this.state.orders && JSON.stringify(this.state.orders) !== JSON.stringify(arr))){
        // this.reloadAppHandler();
        this.setState({orders: arr, unread: ur, numbers: getNumbers(arr)});
      }      
    });
    const token = localStorage.getItem('authToken');
    if(token){
      // this.setState({isAuth: token});
    }
}

componentWillUnmount(){
  // firebase.database().goOffline();
  axios.Cancel;
}

addAdminHandler = () => {
  this.setState({isSignup: true});
  console.log(this.props);
  <Redirect to="/auth" />
}

reloadAppHandler = () => {
  const orderArray = [];
  const unread = [];
  axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
    .then(response => {
        for(let key in response.data){
            if(response.data[key].read.read === false){
              unread.push(response.data[key]);
            }
            orderArray.push({id: key, data: response.data[key]});
        }
        this.setState({loading: false, orders: orderArray, unread: unread, numbers: getNumbers(orderArray)});
    }).catch(err => this.setState({loading: false, error: err}));

}

  render() {
    let numbers = null;
    if(this.state.numbers){
      numbers = this.state.numbers
    }
    const propsData = {
      orders: this.state.orders,
      loading: this.state.loading,
      error: this.state.error,
      reload: this.reloadAppHandler,
      numbers
    };

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if(localStorage.getItem('authToken')){
      routes = (
        <Layout 
          unread={this.state.unread} 
          reload={this.reloadAppHandler} 
          addAdmin={this.addAdminHandler}
          user={this.state.user}>
              <Switch>
                <Route path="/events" render={() => <Events {...propsData}/>}/>
                <Route path="/stationary" render={() => <Stationary {...propsData}/>}/>
                <Route path="/building" render={() => <Building {...propsData}/>}/>
                <Route path="/gen-supply" render={() => <GenSupply {...propsData}/>}/>
                <Route path="/printing" render={() => <Printing {...propsData}/>}/>
                <Route path="/office" render={() => <Office {...propsData}/>}/>
                <Route path="/textile" render={() => <Textile {...propsData}/>}/>
                <Route path="/message" component={MessageBody} />
                {this.state.isSignup ? <Route path="/auth" component={Auth} /> : null}
                <Route path="/" exact render={() => <Home {...propsData} />}/>
                <Redirect to="/" />
              </Switch>
            </Layout>
      );
    }

    return (
      <div className={classes.App}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
