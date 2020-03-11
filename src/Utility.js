
export const getTime = (year, month, day, hours, minutes) => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let  time = 'now';

    if(date.getFullYear() === year){
            if(date.getDate() === day){
            if(date.getHours() === hours){
                if(date.getMinutes() === minutes){
                    return time = ' now';
                }
                if(date.getMinutes() < minutes){
                    return time = ' now'
                }

                if(date.getMinutes() > minutes){
                    return time = date.getMinutes() - minutes + 'min'
                }

            }else if(date.getHours() > hours){
                return time = date.getHours() - hours + 'hrs';   
            }
        }else if(date.getDate() > day){
            if((date.getDate() - day) < 3){
                if(date.getDate() - day){
                    return time = '1 day';
                }else{
                    return time = (date.getDate() - day) + 'days';
                }
                
            }else{
                return time = months[month - 1] + ' ' + day;
            }
        }
  
    }else{
        return time = day + ' ' + months[month - 1] + ' ' + year;
    }

    return time;

};