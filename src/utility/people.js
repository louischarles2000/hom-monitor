import jua from './Aunti-Jua.jpg';
import baraka from './Baraka.jpg';
import Blessing from './Blessing.jpg';
import Brenda from './Brenda.jpg';
import Chris from './Chris.jpg';
import Dirchi from './Drichi-1.jpg';
import Eyan from './Eyan.jpg';
import Faida from './Faida.jpg';
import FaidaBig from './Faida-big.jpg';
import Foni from './Foni.jpg';
import Gloria from './Gloria.jpg';
import Grace from './Grace.jpg';
import Grany from './Grany.jpg';
import Louis from './Louis.jpg';
import MamaFifi from './Mama-fifi.jpg';
import Mosze from './Mosze.jpg';
import Oleo from './Oleo.jpg';
import Papa from './Papa.jpg';
import Sabina from './Sabina.jpg';
import Lindri from './Lindri.jpg';
import Luka from './Luka.jpg';
import Mike from './Mike.jpg';
import Onen from './Onen.jpg';
import Jongole from './Jongole.jpg';
import Logo from './Louis-Logo.png';

export const people = [
    {name: 'Louis', pic: Louis, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Faida Santa', pic: Faida, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Eyan', pic: Eyan, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Lindri', pic: Lindri, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Chris', pic: Chris, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Luka', pic: Luka, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Baraka', pic: baraka, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Rebecca', pic: Grany, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Moses', pic: Mosze, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Drichi', pic: Dirchi, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Sabina', pic: Sabina, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Grace', pic: Grace, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Foni', pic: Foni, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Oleo', pic: Oleo, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Gloria', pic: Gloria, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Faida Salama', pic: FaidaBig, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Brenda', pic: Brenda, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Arapapa', pic: Papa, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Juwa', pic: jua, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Ape', pic: MamaFifi, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Michael', pic: Mike, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Jongole', pic: Jongole, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Blessing', pic: Blessing, out: false, reason: '', timeOut: '', timeIn: ''},
    {name: 'Onen', pic: Onen, out: false, reason: '', timeOut: '', timeIn: ''},
]

export const getTime = (year, month, day, hours, minutes) => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let  time;
    const t = (date.hours > 12) ? 'PM' : 'AM';
    const clock = (hours > 12 ? hours - 12 : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)+ ' ' + t;
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
                    time = clock;
                }
            }else{
                time = day + ' ' + months[month - 1];
            }
        }else{
            time = day + ' ' + months[month - 1];
        }
    }else{
        time = day + ' ' + months[month - 1] + ' ' + year;
    }
    return time;

};