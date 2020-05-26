import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as firebase from 'firebase';

import classes from './App.css';
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
import { connect } from 'react-redux';
import * as actionCreators from './Store/actions/orders';
import Records from './container/Records/Records';
// firebase auth:import users.json --hash-algo=scrypt --rounds=8 --mem-cost=14

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignup: false
    }
    
  }

componentDidMount(){
  console.log(firebase.auth().currentUser);
  
    this.setState({loading: true});
    // this.reloadAppHandler();
    this.props.onFetchOrders(this.props.orders);
  
}


addAdminHandler = () => {
  this.setState({isSignup: true});
  this.props.history.push('/auth');
}

  render() {
    let numbers = null;
    if(this.props.numbers){
      numbers = this.props.numbers
    }
    console.log('NUmbers test: ' + numbers);
    const propsData = {
      orders: this.props.orders,
      loading: this.props.loading,
      error: this.props.error,
      reload: this.props.onUpdateOrders.bind(this, this.props.orders),
      numbers
    };

    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if(localStorage.getItem('userEmail') !== null && localStorage.getItem('authToken') !== null ){
      routes = (
        <Layout 
          unread={this.props.unread} 
          reload={this.props.onFetchOrders} 
          addAdmin={this.addAdminHandler}
          user={localStorage.getItem('userEmail')}>
              <Switch>
                <Route path="/events" render={() => <Events {...propsData}/>}/>
                <Route path="/stationary" render={() => <Stationary {...propsData}/>}/>
                <Route path="/building" render={() => <Building {...propsData}/>}/>
                <Route path="/gen-supply" render={() => <GenSupply {...propsData}/>}/>
                <Route path="/printing" render={() => <Printing {...propsData}/>}/>
                <Route path="/office" render={() => <Office {...propsData}/>}/>
                <Route path="/textile" render={() => <Textile {...propsData}/>}/>
                <Route path="/records" render={() => <Records />} />
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

const mapStateToProps = state => {
  return{
    orders: state.orders.orders,
    loading: state.orders.loading,
    unread: state.orders.unread,
    error: state.orders.error,
    numbers: state.orders.numbers,
    user: state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return{
      onFetchOrders: (prevOrders) => dispatch(actionCreators.fetchOrders(prevOrders)),
      onUpdateOrders: (orders) => dispatch(actionCreators.update(orders))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
