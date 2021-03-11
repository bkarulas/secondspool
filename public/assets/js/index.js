document.getElementById('form').addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
     e.preventDefault();
     document.getElementById("submit").click();
    }
  });

async function enterPool(){
    userEmail = document.getElementById('inputemail').value;
    userBoard = document.getElementById('inputboard').value;
    console.log(userEmail, userBoard)
    let userId = await getUserId(userEmail, userBoard);
    (userId.length>0)?location.replace(baseUrl+`/board?b=${userBoard}&u=${userId[0].id}`):location.replace(baseUrl);
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
