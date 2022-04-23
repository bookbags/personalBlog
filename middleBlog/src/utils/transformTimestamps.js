export default function(timestamp){
    const date = new Date(+timestamp);
    let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    section = date.getSeconds();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    if(hour < 10) hour = "0" + hour;
    if(minute < 10) minute = "0" + minute;
    if(section < 10) section = "0" + section;
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + section;
}