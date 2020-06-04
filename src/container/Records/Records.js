import React from 'react';
import { connect } from 'react-redux';

import classes from './Records.css';
import { faFileContract, faPhone, faPhoneAlt, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import ContactStatusPanel from './contactStatusPanel/contactStatusPanel';
import RecordsList from './RecordsList/RecordsList';
import * as actionCreators from '../../Store/actions/records';
import Empty from '../../component/ReusableComps/Note/empty/empty';

const Records = props => {
    const panelTitles = [
        {name: 'records', icon: faFileContract, func: props.getRecords, active: props.active === 'records'},
        {name: 'contacted', icon: faPhoneAlt, func: props.getContacted, active: props.active === 'contacted'},
        {name: 'uncontacted', icon: faPhoneSlash, func: props.getUncontacted, active: props.active === 'uncontacted'}
    ]

    let list;
    if(props.active === 'contacted'){
        list = <RecordsList list={props.contacted} loading={props.loading} error={props.error}/>;
    }else if(props.active === 'uncontacted'){
        list = <RecordsList list={props.unContacted} loading={props.loading} error={props.error}/>
    }else(
        list = <Empty text="There are no Records here yet"/>
    )
    
    return(
        <div className={classes.Records}>
            <ContactStatusPanel panelTitles={panelTitles} />
            {list}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        active: state.records.active,
        records: state.records.records,
        unContacted: state.records.unContacted,
        contacted: state.records.contacted,
        loading: state.records.loading,
        error: state.records.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecords: () => dispatch(actionCreators.getRecords()),
        getContacted: () => dispatch(actionCreators.getContacted()),
        getUncontacted: () => dispatch(actionCreators.getUncontacted())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);