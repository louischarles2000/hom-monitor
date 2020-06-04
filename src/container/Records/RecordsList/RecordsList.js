import React from 'react';
import { connect } from 'react-redux';

import classes from './RecordsList.css';
import Customer from '../../../component/Customer/Customer';
// import Spinner from  '../../../component/Spinner/Spinner';
// import Notify from '../../../component/ReusableComps/Note/notify/notify';
import ContactInfo from '../overlay/contactInfo/contactInfo';

const RecordsList = props => {
    const data = [
        {name: 'Louis Charles', service: 'Event',show: true, number: '0993728', email: 'louisch@test.com'},
        {name: 'Louis Charles', service: 'Event',show: false, number: '0993728', email: 'louisch@test.com'},
        {name: 'Louis Charles', service: 'Event',show: true, number: '0993728', email: 'louisch@test.com'},
    ]
    let list;
    // if(props.list || list){
        list = (
            data.map((customer, index) => (
                <Customer 
                    key={customer.name + index} 
                    details={customer}
                    contacted={true}
                    />
            ))
        );
    // }
    if(props.loading){
        // list = <Spinner />
    }
    if(props.error){
        // list = <Notify type="danger">{props.error}</Notify>
    }
    return(
        <div className={classes.RecordsList}>
            {/* <ContactInfo /> */}
            {list}
        </div>
    );
}

const mapStateToProps = state => {
    return{

    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);