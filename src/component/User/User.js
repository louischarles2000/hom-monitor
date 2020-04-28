import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import cssClasses from './User.css';
// import Icon from '../ReusableComps/IconList/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowDown, faArrowUp, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const User = props => {
    const [drop, setDrop] = useState(false);
    const toggleDropdown = () => {
        setDrop(!drop);
    }
    let dropCss = [cssClasses.container, ''];
    let arrow = faArrowDown;
    if(drop){
        dropCss = [cssClasses.container, cssClasses.down];
        arrow = faArrowUp;
    }else{
        dropCss = [cssClasses.container, cssClasses.up];
        arrow = faArrowDown;
    }
    const logOut = () => {
        props.clicked();
        props.logout();
    }
    const register = () => {
        props.clicked();
        props.addAdmin();
        props.history.push(`/auth?register=${true}`)
    }
    
    return (
        <div className={cssClasses.User}>
            <div className={cssClasses.topUser} onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser}/>
                <p>{props.user} <span><FontAwesomeIcon icon={arrow}/></span></p>
            </div>
            <div className={dropCss.join(' ')}>
                <div className={cssClasses.dropDown}>
                    <div onClick={register}><span><FontAwesomeIcon icon={faPlus}/></span>  Add new Admin</div>
                    <div onClick={logOut}><span><FontAwesomeIcon icon={faSignOutAlt}/> </span>Logout</div>
                </div>
            </div>
          
        </div>
    );
}

export default withRouter(User);