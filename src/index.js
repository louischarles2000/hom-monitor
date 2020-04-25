import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC1fsRxAEGONa7p2HdU06zcjZuSoB5aKcY",
    authDomain: "wellspring-baa0b.firebaseapp.com",
    databaseURL: "https://wellspring-baa0b.firebaseio.com",
    projectId: "wellspring-baa0b",
    storageBucket: "wellspring-baa0b.appspot.com",
    messagingSenderId: "65218643414",
    appId: "1:65218643414:web:27eecaa4aae32f9bdf1077",
    measurementId: "G-Q439BYGW29"
}
firebase.initializeApp(config);
// firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
