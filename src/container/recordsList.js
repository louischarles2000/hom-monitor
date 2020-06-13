import React from 'react';

import Record from '../Components/Record/Record';

const RecordsList = props => {
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
         list = <p>Nothing</p>
     }
    return list;
}

export default RecordsList;