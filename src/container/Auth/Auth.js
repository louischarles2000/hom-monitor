import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import cssClasses from './Auth.css';
import Input from '../../component/ReusableComps/Input/Input';
import Button from '../../component/ReusableComps/Button/Button';
import { checkValidity } from '../../Utility';
import Notify from '../../component/ReusableComps/Note/notify/notify';
import Spinner from '../../component/Spinner/Spinner';
import * as firebase from 'firebase';

class Auth extends Component{
    state = {
        elements: {
            email: {
                placeholder: 'Username',
                type: 'email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                elementConfig: {},
                valid: false,
                touched: false
            },
            password: {
                placeholder: 'Password',
                type: 'password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                elementConfig: {},
                valid: false,
                touched: false
            }
        },
        isValid: false,
        error: null,
        loading: false,
        userToken: null,
        isSignUp: false
    };
    _isMounted = false;
    app = null;
    componentDidMount(){
        this._isMounted = true;
        const signUp = this.props.location.search.split('=').pop();
        if(this._isMounted){
            this.app = firebase;
            this.setState({isSignUp: signUp});
        }
        // console.log(app);
    }

    componentWillUnmount(){
        this._isMounted = false;
        this.app = null;
    }

    onChangeHandler = (event, identifier) => {
        const updatedElement = {
            ...this.state.elements[identifier],
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.elements[identifier].validation),
            touched: true
        };

        const updateElements = {
            ...this.state.elements,
            [identifier]: updatedElement
        };
        let formValid = true;
        for(let key in updateElements){
            formValid = updateElements[key].valid && formValid;
        };
        this.setState({elements: updateElements, isValid: formValid})
    }
     onSubmitHandler = (event) => {
        event.preventDefault();
        if(this._isMounted)console.log('IS MOUNTED...');
        if(this._isMounted)this.setState({loading: true, error: null});
        console.log('SUBMITTED...');
        const email = this.state.elements.email.value;
        const password = this.state.elements.password.value;

        if(this.app){
            if(this.state.isSignUp){
                this.app.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    this.app.auth().updateCurrentUser(this.app.auth().User);
                    localStorage.setItem('authToken', res.user.refreshToken);
                    if(this._isMounted)this.setState({loading: false, userToken: res.user.refreshToken});
                    this.props.history.push('/');
                    console.log(this.props.history);
                })
                .catch(error => {
                    const code = error.code.split('/').pop();
                    const errCode = code.split('-').join(' ');
                    const errMessage = error.message;
                    if(this._isMounted)this.setState({loading: false, error: errCode});
                    console.log('code: ' + errCode);
                    console.log('message: ' + errMessage);
                });
    
            }else{
                this.app.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    if(this._isMounted)this.setState({loading: false, userToken: res.user.refreshToken});
                    localStorage.setItem('authToken', res.user.refreshToken);
                    this.props.history.replace('/');
                    console.log('SIGN IN OPERATION SUCCESSFULL...');
                })
                .catch(error => {
                    const code = error.code.split('/').pop();
                    const errCode = code.split('-').join(' ');
                    const errMessage = error.message;
                    if(this._isMounted)this.setState({loading: false, error: errCode});
                    console.log('code: ' + errCode);
                    console.log('message: ' + errMessage);
                });
            }
        }
        
        
        this.props.history.push('/');
    }

    render(){
        console.log(this.state.error);
        const elements = [];
        let logText = 'Login as Admin';
        let buttonText = 'Login';

        if(this.state.isSignUp){
            logText = 'Sign up as new Admin';
            buttonText = 'Sign up';
        }

        for(let key in this.state.elements){
            elements.push({ id: key, config: this.state.elements[key]});
        }
        let errorMess = '';

        if(this.state.error){
        errorMess = <Notify type="danger">{this.state.error}</Notify>
        }
        let spinner = '';
        if(this.state.loading){
            spinner = <Spinner />
        }
        let form = (
            <form className={cssClasses.Form} onSubmit={event => this.onSubmitHandler(event)}>
            {errorMess}
            {spinner}
                <div className={cssClasses.Objects}>
        <h2>{logText}</h2>
                    {elements.map(element => (
                        <Input 
                            key={element.id}
                            inputType={element.config.type}
                            placeholder={element.config.placeholder}
                            changed={event => this.onChangeHandler(event, element.id)}
                            touched={element.config.touched}
                            shouldValidate={element.config.validation}
                            valid={element.config.valid}
                            value={element.config.value}/>
                    ))}
                    <Button clicked={event => this.onSubmitHandler(event)} disabled={!this.state.isValid}>{buttonText}</Button>
                </div>
                
            </form>
        );
        return(
            <div className={cssClasses.Auth}>
                <h1>Wellsprings Connections Manager</h1>
                {form}
            </div>
        );
    }
};

export default withRouter(Auth);