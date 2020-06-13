import React from 'react';

import PersonOut from '../Components/person/PersonOut/PersonOut';
import classes from './styles.css';

const PeopleOutList = props => {
    let list = '';
    if(props.peopleOut){
        console.log(props.peopleOut);
        list = (
          props.peopleOut.map(person => (
              <PersonOut 
                key={person.id}
                name={person.data.name}
                reason={person.data.reason}
                timeOut={person.data.timeOut}
                id={person.id}
                reload={props.reload}
                img={person.data.pic}/>
          ))
        )
      }
      if(props.peopleOut && props.peopleOut.length === 0){
        list = (
            <div className={classes.Notice}>
            <p>THERE'S NO ONE OUTSIDE AT THE MOMENT!</p>
            </div>
            );
        }
    return list;
}

export default PeopleOutList;