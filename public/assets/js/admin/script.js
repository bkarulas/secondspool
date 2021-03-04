adminId = 1;
mainUrl = window.location.href;
baseUrl = mainUrl.substring(0,mainUrl.indexOf('?'));

monthFull = ['January', 'Feburay', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov','Dec'];

//Function to get the name of the month => len = Full or Short
function getGameDate(info, len){
    info = info.substring(0, info.indexOf('T'));
    let dateArr = info.split('-');
    (len=='short')? months = monthShort : months = monthFull;
    let theDate = (months[parseInt(dateArr[1])-1]) +" "+ dateArr[2];
    return theDate; 
}
//Function to get the time in a 12 hour clock
function getGameTime (info){
    info = info.split('T').pop();
    timeArr = info.split(':');
    (timeArr[0]>=12)?ampm='pm':ampm='am'
    let time = (parseInt(timeArr[0])-12)
    time += ":"+timeArr[1]+ampm;
    return time;
}

function getUrlVar(winLocaation, id){
    let url_string = winLocaation;
    let url = new URL(url_string);
    return url.searchParams.get(`${id}`);
}


minBoxes = [1,2,3,5,6,10,12,20,30]
maxBoxes = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30],
    [3,6,9,12,15,18,21,24,27,30],
    [5,10,15,20,30],
    [6,12,18,24,30],
    [10,20,30],
    [12,24,36],
    [20,40],
    [30]
]