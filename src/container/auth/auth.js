import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import classes from './auth.css';
import Spinner from '../../Components/Spinner/Spinner';
import Notify from '../../Components/notify/notify';

const Auth = props => {
    const [regMonitors, setRegMonitors] = useState(null);
    const [monitor, setMonitor] = useState({name: '', password: ''});
    const [loadng, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const onChangeHAndler = (event, field) => {
        event.preventDefault();
        if(field === 'name'){
            setMonitor({name: event.target.value, password: monitor.password});
            // console.log(monitor.name)
        }else{
            setMonitor({name: monitor.name, password: event.target.value});
            // console.log(monitor.password)
        }
    }
    useEffect(() => {
        setLoading(true);
        setMessage(null);
        const monitors = [];
        axios.get('https://home-c153e.firebaseio.com/monitors.json')
        .then(res => {
            console.log(res.data);
            for(let i in res.data){
                monitors.push(res.data[i]);
            }
            setLoading(false);
            setRegMonitors(monitors);
        })
        .catch(err => setMessage('Network problem'));
    }, []);

    const onClickHAndler = (event) => {
        event.preventDefault();
        console.log(monitor);
        if(regMonitors){
            regMonitors.forEach(el => console.log(el));
            regMonitors.map(mon => {
                if(mon.name === monitor.name && mon.password === monitor.password){
                    setIsAuth(true);
                    setTimeout(() => {
                        setIsAuth(false);
                        localStorage.setItem('currentUser', monitor.name);
                        props.history.push('/people');
                    }, 0);
                }
                else if(mon.name === monitor.name && mon.password !== monitor.password){
                    setMessage('Password is wrong, try again!');
                    setMonitor({password: ''});
                }
                else {
                    setMessage('Wrong user!');
                }
            })
        }
        
    }

    let login = '', err = '', log = '';
    if(message){
        err = (
            <div className={classes.Err}>
                <p>{message}</p>
            </div>
        );
    }

    if(isAuth){
        log = <Notify>Logged in</Notify>
    }

    if(regMonitors){
        login = (
            <div className={classes.con}>
            <button onClick={() => props.history.push('/people')}>cancel</button>
                <h2>Login</h2>
                <form onSubmit={onClickHAndler}>
                    <input type="text" placeholder="Monitor name" onChange={(event) => onChangeHAndler(event, 'name')}/>
                    <input type="password" placeholder="Password" onChange={(event) => onChangeHAndler(event, 'password')} />
                    {err}
                    <button type="submit" onClick={event => onClickHAndler(event)}>Login</button>
                </form>
            </div>
        );
    }
    if(loadng){
        login = <Spinner />
    }
    return(
        <div className={classes.Auth}>
          {login}
        </div>
    );
}

export default withRouter(Auth);