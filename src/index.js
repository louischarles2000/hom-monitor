import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDEqv_7dYBG6q-LAbU3sNBGxXF_GbscRZg",
    authDomain: "home-c153e.firebaseapp.com",
    databaseURL: "https://home-c153e.firebaseio.com",
    projectId: "home-c153e",
    storageBucket: "home-c153e.appspot.com",
    messagingSenderId: "460060449787",
    appId: "1:460060449787:web:f3a66236e2420de050c95e",
    measurementId: "G-8Y4TV9S0KW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
