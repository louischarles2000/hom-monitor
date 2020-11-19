import React, { useState } from 'react';
import classes from './summary.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Element from './element/element';
// import { getTimeSpent } from '../../../../utility/people';

const summary = props => {
    const [drop, setDrop] = useState(false);
    const toggle = () => {
        setDrop(true);
        if(drop){
            setDrop(false);
        }
    }
    // const writeTime = (hrs, mins) => {
    //     let time = hrs + ' hours and ' + mins + ' mins';
    //         const reedMin = (min, n) => {
    //             if(min > 60){
    //                 let redmin = min - 60;
    //                 time = (hrs + n ) + ' hours and ' + redmin + ' mins';
    //                 return time
    //                 if(redmin > 60){
    //                     reedMin(redmin, n + 1);
    //                 }
    //             }
    //             return time;
    //         }
    //         reedMin(mins, 1);
        
    //     return time;
    // }
    
    // const getTotalTime = (obj) => {
    //     console.log(obj);
    //     const times = [];
    //     let tottalTime = '2hrs';
    //     obj.map(tm => {
    //         times.push(getTimeSpent(tm.timeOut, tm.timeIn));
    //     })
    //     const hours = [], mins = [];
    //     let i = 0;
    //     times.map((el) => {
    //         console.log('-----------> number ' + (i++) + ' arr ' + el);
    //         if(el.includes('and')){
    //             el = el.split('and')
    //             const hr = el[0].replace('hrs', '');
    //             const min = el[1].replace('mins', '');
    //             hours.push(parseInt(hr));
    //             mins.push(parseInt(min));
    //         }
    //         if(el.includes('hrs')){
    //             el = el.replace('hrs', '');
    //             hours.push(parseInt(el));
    //         }
    //         if(el.includes('mins')){
    //             el = el.replace('mins', '');
    //             mins.push(parseInt(el));
    //         }
    //     });
    //     // console.log(hours)
    //     // console.log(mins)
    //     let hoursSpent = 1, minsSpent = 40;
    //     if(hours.length > 0){ hoursSpent = hours.reduce((x, y) => x + y);}
    //     if(hours.length > 0){ minsSpent = mins.reduce((x, y) => x + y);}
    //     tottalTime = hoursSpent + 'hours and ' + minsSpent + 'mins'
    //     // console.log(tottalTime);
    //     // return writeTime(hours, mins);
    //     return tottalTime;
    // }
    let dropCss = [classes.drop, ''];
    if(drop){
        dropCss = [classes.drop, classes.show];
    }
    return (
        <div className={classes.summary}>
            <div className={classes.first} onClick={toggle}>
                <p><span>{props.person.name}</span> got out: <span>{props.person.data.length === 1 ? props.person.data.length + ' time' : props.person.data.length + ' times'}</span></p>
                <p>{drop ? <FontAwesomeIcon icon={faArrowUp}/> : <FontAwesomeIcon icon={faArrowDown}/> }</p>
            </div>
            <hr />
            <div className={dropCss.join(' ')}>
                {
                    props.person.data.map(el => (
                        <Element data={el}/>
                    ))
                }
            </div>
            {/* <p>Total time out is arround <span>{getTotalTime(props.person.data)}</span>.</p> */}
        </div>
    );
}

export default summary;