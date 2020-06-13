import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import classes from './WeeksComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarWeek, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import Record from '../../../Components/Record/Record';
import Summary from './summary/summary';

const WeeksComponent = props => {
    const [show, setShow] = useState(false);
    const [people, setPeople] = useState(null);
    const showHAndler = () => {
        console.log('Clicked')
        setShow(true);
        if(show){
            setShow(false);
        }
        console.log(show)
    }
    let listCss = [classes.Out, ''];
    if(show){
        listCss = [classes.Out, classes.show];
    }

    useEffect(() => {
        if(props.records){
            const list = [];
            console.log(props.records);
            const newObject = props.records.reduce((obj, value) => {
                const key = value.name;
                if(obj[key] == null) obj[key] = [];

                obj[key].push(value);
                return obj;
            }, {}); 
            // console.log(newObject); 
            for(let key in newObject){
                list.push({name: key, data: newObject[key]});
            
            }
            console.log(list);
            setPeople(list);
        }
    }, [props.records]);
    const onoCancel = () => {
        props.history.push('/records');
    }
   return(
    <div className={classes.WeeksComponent}>
        <div className={classes.top}>
            <button onClick={onoCancel}><FontAwesomeIcon icon={faArrowLeft}/> Back</button>
            <h2  onClick={showHAndler}><FontAwesomeIcon icon={faCalendarWeek}/> This week</h2>
        </div>
        <div className={listCss.join(' ')}>
            {people ? people.map(person => (
            <Summary person={person}/>
          )) : null}
        </div>
        <div className={classes.Other}>
            <h2><FontAwesomeIcon icon={faCalendarPlus}/> Other Weeks</h2>
        </div>
    </div>
   );
}

export default withRouter(WeeksComponent);