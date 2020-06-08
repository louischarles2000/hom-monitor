import React, { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter, Route } from "react-router-dom";
import classes from './App.css';
import RoutePanel from './Components/RoutePanel/RoutePanel';
import Person from './Components/person/person';
import PersonOut from './Components/person/PersonOut/PersonOut';
import img from './Louis-Logo.png';
import Spinner from './Components/Spinner/Spinner';
import { people } from './utility/people';

class App extends Component {
  state = {
    active: 'people',
    people: null,
    peopleOut: null,
    loading: false,
    error: null
  }
  componentDidMount(){
    console.log('exampl: ' + img);
    people.map(person => {
      axios.post('https://home-c153e.firebaseio.com/people.json', person)
      .then(resp => {
        console.log('SUCCESSFUL!!!!');
      })
      .catch(err => console.log(err));
    });
    this.setState({loading: true});
    this.reloadDataFromDatabase();
  }

  reloadDataFromDatabase = () => {
    const list = [];
  const PipsOut = [];
  axios.get('https://home-c153e.firebaseio.com/people.json')
  .then(resp => {
    for(let key in resp.data){
      if(resp.data[key].out){
        console.log(resp.data[key].out);
        PipsOut.push({id: key, data: resp.data[key]});
      }else{
        list.push({id: key, data: resp.data[key]});
      }
    }
    this.setState({loading: false, people: list, peopleOut: PipsOut});
  })
  .catch(err => {
    this.setState({loading: false, error: err});
  });
  }
  onChangeActive = (route) => {
    this.setState({active: route});
  }
  render() {
    let list = <Spinner />;
    if(this.state.active === 'people'){
      if(this.state.people){
        list = (
          this.state.people.map(person => (
            <Person 
              key={person.id}
              name={person.data.name}
              img={person.data.pic}
              id={person.id}/>
          ))
        );
      }
     
    };
    if(this.state.active === 'people out'){
      console.log(this.state.peopleOut)
      if(this.state.peopleOut){
        console.log(this.state.peopleOut);
        list = (
          this.state.peopleOut.map(person => (
              <PersonOut 
                key={person.id}
                name={person.data.name}
                reason={person.data.reason}
                timeOut={person.timeOut}
                id={person.id}
                img={person.data.pic}/>
          )
          )
        )
      }
      if(this.state.peopleOut && this.state.peopleOut.length === 0){
        list = (
          <div className={classes.Notice}>
            <p>THERE'S NO ONE OUTSIDE AT THE MOMENT!</p>
          </div>
          );
      }
     }
     if(this.state.loading){
       list = <Spinner />
     }
    return (
      <div className={classes.App}>
        <div className={classes.Header}>
          <h1>HOME MONITOR</h1>
        </div>
        <RoutePanel active={this.state.active} reset={this.onChangeActive}/>
        <div className={classes.Container}>
          {list}
        </div>
      </div>

    );
  }
}

export default App;
