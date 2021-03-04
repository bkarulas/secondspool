let message = getUrlVar(mainUrl, 'm');
window.onload = checkForErrors()
console.log(message);

document.querySelector('#login').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enterPool();
    }
});



function checkForErrors(){
    console.log("CHECKING");
    messageDiv = document.getElementById('usermessage');
    if (getUrlVar(mainUrl, 'm')){
        if (getUrlVar(mainUrl, 'm')=='ERROR'){
            messageDiv.innerText = "Something went wrong, please try it again"
        }else{
            messageDiv.innerText = "YOU ARE HERE";
        }
    }else{
        messageDiv.innerText = 'Enter your email and board number'
    }
}

async function enterPool(){
    let userEmail = document.getElementById('inputemail').value;
    let userBoard = document.getElementById('inputboard').value;
    if (!userEmail || !userBoard){
        if (!userEmail){
            let emailDiv = document.getElementById('inputemail');
            emailDiv.className = 'logintext missing';
            emailDiv.setAttribute('placeholder','Enter a valid Email');
        }
        if (!userBoard){
            let boardDiv = document.getElementById('inputboard');
            boardDiv.className = 'logintext missing';
            boardDiv.setAttribute('placeholder','Enter a valid Board');
        }
    }else{
        let userId = await getUserId(userEmail, userBoard);
        console.log(userId.length);
        if (userId.length>0){
            console.log('USER')
            console.log (userId[0]);
            let gameUrl = `board?b=${userBoard}&u=${userId[0].id}`;
            console.log(baseUrl+gameUrl);
            location.replace(baseUrl+gameUrl);
        }else{
            let gameUrl= "?m=ERROR"
            location.replace(baseUrl+gameUrl);
        }
    }
}

async function getUserId(userEmail,userBoard){
    const res = await fetch("/api/login/user",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            info:{
                user:userEmail,
                board:userBoard
            }
        })
    });
    return res.json();
}