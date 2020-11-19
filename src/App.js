import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import classes from './App.css';
import RoutePanel from './Components/RoutePanel/RoutePanel';
// import Person from './Components/person/person';
// import PersonOut from './Components/person/PersonOut/PersonOut';
import img from './Louis-Logo.png';
// import Spinner from './Components/Spinner/Spinner';
// import Record from './Components/Record/Record';
import PeopleList from './container/peopleList';
import PeopleOutList from './container/peopleOutList';
import RecordsList from './container/recordsList';
// import { people } from './utility/people';
import Auth from './container/auth/auth';
import Notify from './Components/notify/notify';
import WeeksComponent from './container/Summary/WeeksComponent/WeeksComponent';

class App extends Component {
  state = {
    active: 'people',
    people: null,
    peopleOut: null,
    records: null,
    loading: false,
    error: null,
    loggingout: false
  }
  componentDidMount(){
    console.log('exampl: ' + img);
 
    // people.map(person => {
    //   axios.post('https://home-c153e.firebaseio.com/people.json', person)
    //   .then(resp => {
    //     console.log('SUCCESSFUL!!!!');
    //   })
    //   .catch(err => console.log(err));
    // });
    this.setState({loading: true});
    this.reloadDataFromDatabase();
  }

  reloadDataFromDatabase = () => {
    const list = [];
    const PipsOut = [];
    const records = [];
    axios.get('https://home-c153e.firebaseio.com/records.json')
    .then(res => {
      for(let key in res.data){
        records.push(res.data[key]);
      }
      this.setState({records});
    })
    axios.get('https://home-c153e.firebaseio.com/people.json')
    .then(resp => {
      for(let key in resp.data){
        if(resp.data[key].out){
          console.log(resp.data[key].out);
          PipsOut.push({id: key, data: resp.data[key]});
        }else if(resp.data[key].out === false){
          list.push({id: key, data: resp.data[key]});
        }
      }
      this.setState({loading: false, people: list, peopleOut: PipsOut});
    })
    .catch(err => {
      // this.setState({loading: false, error: err});
    });
  };
  onChangeActive = (route) => {
    // this.reloadDataFromDatabase();
    this.setState({active: route});
  }
  authHAndler = () => {
    if(localStorage.getItem('currentUser')){
      localStorage.removeItem('currentUser');
      this.setState({loggingout: true});
      setTimeout(() => {
        this.setState({loggingout: false});
      }, 3000);
    }else{
      this.props.history.push('/auth');
    }
  }
  render() {
    let logging = '';
    if(this.state.loggingout){
      logging = <Notify type="danger">Logging out...</Notify>
    }
    return (
      <div className={classes.App}>
        <div className={classes.Header} onClick={this.authHAndler}>
          <h1>HOME MONITOR</h1>
        </div>
        {logging}
        <RoutePanel active={this.state.active} reset={this.onChangeActive} reload={this.reloadDataFromDatabase}/>
        <div className={classes.Container}>
          {/* <BrowserRouter> */}
            <Switch>
              <Route path="/people" render={() => <PeopleList people={this.state.people} loading={this.state.loading} reload={this.reloadDataFromDatabase} error={this.state.error}/> } />
              <Route path="/people-out" render={() => <PeopleOutList peopleOut={this.state.peopleOut} reload={this.reloadDataFromDatabase} /> } />
              <Route path="/records" render={() => <RecordsList records={this.state.records} loading={this.state.loading} reload={this.reloadDataFromDatabase} /> } />
              <Route path="/weeks" render={() => <WeeksComponent records={this.state.records}/>} />
              <Route path="/auth" component={Auth} />
              <Redirect to="/people" />
            </Switch>
          {/* </BrowserRouter> */}
        </div>
      </div>

    );
  }
}

export default withRouter(App);
