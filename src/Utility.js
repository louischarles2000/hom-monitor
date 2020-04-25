import React from 'react';
import * as firebase from 'firebase';
import Notify from './component/ReusableComps/Note/notify/notify';

export const unreadMessage = (id) => {
    return firebase.database().ref().child(`orders/${id}/read/`).update({read: false});
};

export const removeMessage = (id) => {
    firebase.database().ref().child(`orders/${id}`).remove()
    .then(() => {
        alert('message has been deleted');
        <Notify type="danger">Message deleted</Notify>
    })
};

export const readMessage = (id) => {
    firebase.database().ref().child(`orders/${id}/read/`).update({read: true});
};

export const updateObject = (oldState, currentState) => {
    return {
        ...oldState,
        ...currentState
    };
};
export const updateArray = (oldState, currentState) => {
    return [
        ...oldState,
        ...currentState
    ];
};
export const scrollbar = (list) => {
    if(list.length >= 11){
        return true;
    }else{
        return false
    }
};

export const getNumbers = list => {
    const arr = [];
    let numberOfRead, numberOfUnread, overAllNumber;
    overAllNumber = list.length;
    list.map(el => {
        if(el.data.read.read){
            arr.push(el);
        }
        return arr;
    });
    numberOfRead = arr.length
    numberOfUnread = overAllNumber - numberOfRead;
    return {
        overAllNumber,
        numberOfRead,
        numberOfUnread
    };
};

export const textLength = sentence => {
    const textArr = [];
    let text;
    if(sentence){
        sentence.split(' ').map(word => {
            textArr.push(word);
            if(textArr.join('').length <= 30){
                text = textArr.join(' ');
            }
        });
    }
    return text + '...';
}

export const getTime = (year, month, day, hours, minutes) => {
    const date = new Date();
    console.log(date.getHours());
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let  time;
    if(date.getFullYear() === year){
        if(date.getMonth() === (month -1)){
            if(date.getDate() === day){
                if(date.getHours() === hours){
                    if(date.getMinutes() === minutes){
                        time = 'now'
                    }else if(date.getMinutes() < minutes){
                        time = 'now';
                    }else{
                        time = date.getMinutes() - minutes + ' min';
                    }
                }else{
                    time = hours + ':' + minutes;
                }
            }else{
                time = date.getDate() - day + ' D';
            }
        }else{
            time = day + ' ' + months[month - 1];
        }
    }else{
        time = day + ' ' + months[month - 1] + ' ' + year;
    }
    return time;

};