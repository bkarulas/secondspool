// const theMainUrl = window.location.href;
// const theUrl = theMainUrl.substring(0,theMainUrl.indexOf('/?'));
const theUrl = "http://localhost:8080"
// const theUrl = "http://hkypool.com"

let inputemail = document.getElementById('inputemail');
let inputboard = document.getElementById('inputboard');


async function enterPool(){
    let userEmail = '';
    let userBoard = '';
    userEmail = inputemail.value;
    userBoard = inputboard.value;
    let userId = await getUserId(userEmail, userBoard);
    //let gameUrl='';
    (userId.length>0)?location.replace(theUrl+`/board?b=${userBoard}&u=${userId[0].id}`):location.replace(theUrl);
    //location.replace(theUrl+gameUrl);
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
