// const theMainUrl = window.location.href;
// const theUrl = theMainUrl.substring(0,theMainUrl.indexOf('/?'));
const theUrl = "https://hkypool.com"

let inputemail = document.getElementById('inputemail');
let inputboard = document.getElementById('inputboard');


async function enterPool(){
    let userEmail = inputemail.value;
    let userBoard = inputboard.value;
    let userId = await getUserId(userEmail, userBoard);
    let gameUrl='';
    (userId.length>0)?gameUrl = `/board?b=${userBoard}&u=${userId[0].id}`:gameUrl='';
    setTimeout( window.location.href = theUrl+gameUrl,1000);
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
