mainUrl = window.location.href;
baseUrl = mainUrl.substring(0,mainUrl.indexOf('/?'));

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


let Alert = new CustomAlert;

function CustomAlert(){
    this.render = function (dialog, title) {
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = 'block';
        dialogoverlay.style.height = winH+'px';
        dialogbox.style.display = 'block';
        document.getElementById('dialogboxhead').innerHTML = title;
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function (){
        document.getElementById('dialogbox').style.display = 'none';
        document.getElementById('dialogoverlay').style.display = 'none';
        createTheBoard();
    }
}