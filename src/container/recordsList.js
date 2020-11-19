import React from 'react';
import { withRouter } from 'react-router-dom';

import Record from '../Components/Record/Record';
import SummaryBtn from './Summary/SummaryBtn/SummaryBtn';
import Spinner from '../Components/Spinner/Spinner';
// import WeeksComponent from './Summary/WeeksComponent/WeeksComponent';

const RecordsList = props => {
  const onCLick = () => {
    console.log('CLICKKKKKKKKKKKKED')
    props.history.push('/weeks');
  }
    let list;
    if(props.records){
        list = (
          props.records.reverse().map(record => (
            <Record 
              key={record.name + ' ' + record.reason}
              name={record.name}
              reason={record.reason}
              timeOut={record.timeOut}
              reload={props.reload}
              timeIn={record.timeIn}/>
          ))
        );
     }else{
         list = <p>An error occured</p>
     }
     if(props.loading){
       list = <Spinner />
     }
    return (
     <div>
        <SummaryBtn clicked={onCLick}/>
        {list}
     </div>
    );
}

export default withRouter(RecordsList);