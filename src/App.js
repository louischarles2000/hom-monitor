import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
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
import { getNumbers, updateArray } from './Utility';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: null,
      loading: false, 
      error: null,
      unread: null, 
      numbers: null
    }
    
  }

componentDidMount(){
    this.setState({loading: true});
    // const arr1 = [1,2];
    // const arr2 = [1,2];
    // if(JSON.stringify(arr1) === JSON.stringify(arr2)){
    //   console.log('IT WORKS');
    // }else{
    //   console.log('NOOOOOOO!')
    // }
    this.reloadAppHandler();
    // console.log('test   ' + unread.length);
}

componentDidUpdate(){
  const arr = [];
  firebase.database().ref().once('value')
    .then(data => {
      console.log(data.child('/orders').val());
      const obj = data.child('/orders').val();
      for(let key in obj){
        arr.push({id: key, data: obj[key]});
      }
      if(JSON.stringify(this.state.orders) !== JSON.stringify(arr)){
        // console.log('IT WORKS');
        this.reloadAppHandler();
      }
    })
}

reloadAppHandler = () => {
  const orderArray = [];
  const unread = [];

  axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
    .then(response => {
      console.log(response.data);
        for(let key in response.data){
            if(response.data[key].read === false){
              unread.push(response.data[key]);
            }
            orderArray.push({id: key, data: response.data[key]});
        }
        console.log('test   ' + unread.length);
        this.setState({loading: false, orders: orderArray, unread: unread, numbers: getNumbers(orderArray)})
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

    return (
      <div className={classes.App}>
        <BrowserRouter>
            <Layout unread={this.state.unread} reload={this.reloadAppHandler}>
              <Route path="/" exact render={() => <Home {...propsData} />}/>
              <Route path="/events" render={() => <Events {...propsData}/>}/>
              <Route path="/stationary" render={() => <Stationary {...propsData}/>}/>
              <Route path="/building" render={() => <Building {...propsData}/>}/>
              <Route path="/gen-supply" render={() => <GenSupply {...propsData}/>}/>
              <Route path="/printing" render={() => <Printing {...propsData}/>}/>
              <Route path="/office" render={() => <Office {...propsData}/>}/>
              <Route path="/textile" render={() => <Textile {...propsData}/>}/>
              <Route path="/message" component={MessageBody} />
            </Layout>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
