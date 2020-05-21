import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import cssClasses from './Auth.css';
import Input from '../../component/ReusableComps/Input/Input';
import Button from '../../component/ReusableComps/Button/Button';
import { checkValidity } from '../../Utility';
import Notify from '../../component/ReusableComps/Note/notify/notify';
import Spinner from '../../component/Spinner/Spinner';
// import * as firebase from 'firebase/app';
import * as actionCreators from '../../Store/actions/auth';

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
        isSignUp: false
    };
    
    componentDidMount(){
        const signUp = this.props.location.search.split('=').pop();
        this.setState({isSignUp: signUp});
    }


    componentDidUpdate(){
        if(this.props.error !== null){
            console.log('Error : ' + this.props.error);
        }
        if(this.props.loading){
            console.log('Loading : ' + this.props.loading);
        }
        console.log('Loading : ' + this.props.loading);
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
        const email = this.state.elements.email.value;
        const password = this.state.elements.password.value;
        this.props.onAuth(email, password, this.state.isSignUp);
        console.log(this.state.isSignUp);
        if(this.state.isSignUp){
            this.props.history.push('/');
        }
    }

    render(){
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
        let spinner = null;
        if(this.props.error){
            console.log('error : ' + this.props.error);
            errorMess = <Notify type="danger">{this.props.error}</Notify>
        }
        if(this.props.loading){
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

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));