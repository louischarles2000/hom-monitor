import React from 'react';
import Person from '../Components/person/person';
import Spinner from '../Components/Spinner/Spinner';

const PeopleList = props => {
    let list = '';
    if(props.people){
        if(props.people.length > 24){
            props.reload();
        }
        list = (
          props.people.map(person => (
            <Person 
              key={person.id}
              name={person.data.name}
              img={person.data.pic}
              reload={props.reload}
              id={person.id}/>
          ))
        );
      }
    if(props.loading){
        list = <Spinner />
      }
    return list
}

export default PeopleList;