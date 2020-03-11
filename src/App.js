import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import classes from './App.css';
import Layout from './HOC/Layout/Layout';
import Home from './container/Home/Home';
class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
            <Layout>
              <Route path="/" exact component={Home}/>
            </Layout>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
