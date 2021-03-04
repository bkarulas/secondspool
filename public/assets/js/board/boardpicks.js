let currentPicks = [];
let alreadyTaken = 0;

//Prints all the picks taken and makes a 
async function printAllPicks(){
    let allBoardPicks = await getAllBoardPicks(boardId)
    console.log(allBoardPicks);
    if (allBoardPicks[0].id>0){
        allBoardPicks.forEach(pick => {
            console.log(pick);
            (pick.sec<10)?divId = `0${pick.sec}`: divId = `${pick.sec}`;
            let boardBlockDiv = document.getElementById(`block${divId}`);
            boardBlockDiv.className = 'taken';
            boardBlockDiv.setAttribute('onclick', ` this.disabled=true;`)
            let boardNameDiv = document.getElementById(`name${divId}`);
            (pick.alias=='')?divName = pick.name:divName=pick.alias;
            (divName.length>8)?boardNameDiv.className = 'boardnamesm':'';
            boardNameDiv.innerText=  divName.toUpperCase();
            (pick.id == userId)? alreadyTaken++:'';
        });
        if (alreadyTaken>0){
            document.getElementById('messagetaken').innerHTML = `<b>TAKEN: ${alreadyTaken}</b>`;
        }
    }
}

//submit the picks
async function enterThesePicks(){
    let allBoardPicks = await getAllBoardPicks(boardId)
    currentPicks.sort(function (a,b){return a-b})
    console.log(currentPicks)
    picksGood = true;
    for (i=0; i<currentPicks.length; i++){
        for (p=0; p<allBoardPicks.length; p++){
            if (currentPicks[i]==allBoardPicks[p].sec){
                console.log("TAKEN: "+currentPicks[i]+" => "+allBoardPicks[p].sec)
                picksGood = false;
                p=allBoardPicks.length;
            }
        }
        (picksGood == false)?i=currentPicks.length:'';
    }
    if (picksGood==true){
        //picks are note taken and you can commit them to the DB
        fetch("api/board/enterpicks",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pick:currentPicks,
                userId: parseInt(userId),
                boardId:parseInt(boardId)
            })
        })
        Alert.render(`Your number are in. Good luck !! </br> Click <b>"OK"</b> to view the updated board.`,`PICK ARE IN`);
    }else if (picksGood==false){
        Alert.render(`One of the numbers you choose was just taken. Click <b>"OK"</b> to refresh the board and view the available numbers, and choose again.`,`OPPS SOMETHING WENT WRONG`);
    }else{
        console.log('SOMETHING WENT WRONG')
    }
}

//box get selected
async function selectThisBox(id){
    let currentUser = await getCurrentLoggedInUser(userId);
    let boardInfo = await getTheBoardInfo(boardId);
    //creates a new max if the user has already made picks
    let max = boardInfo[0].max - alreadyTaken;
    if (currentPicks.length == max){
        console.log("MAX HIT")
        document.getElementById('messageselected').innerHTML = `You can <b>not</b> enter in any more pick for this game, you have already selected the max of <b>${alreadyTaken}</b>`;
        (currentPicks.length>0)?document.getElementById('submitcurrentpicks').disabled = false :document.getElementById('submitcurrentpicks').disabled = true;
    }else if (currentPicks.length < max){
        (currentUser[0].alias=='')?currentName=currentUser[0].name:currentName=currentUser[0].alias;
        currentPicks.push(id);
        (id<10)? blockId = `0${id}` : blockId = id;
        nameDiv = document.getElementById(`name${blockId}`);
        (currentName.length>8)?nameDiv.className = 'boardnamesm':nameDiv.className = 'boardname';
        nameDiv.innerText = currentName;
        currentBox = document.getElementById(`block${blockId}`);
        currentBox.setAttribute('onclick', ` this.disabled=true;`);
        currentBox.className='selected';
        console.log(currentPicks);
        analyzeCurrentPick(boardInfo[0].min, max, currentPicks.length);
    }
}

//see what pick they are on and the message to display.
async function analyzeCurrentPick(min, max, num){
    console.log("MIN: "+min);
    console.log("MAX: "+max);
    console.log("num: "+num);
    let messageDiv = document.getElementById('messageselected');
    let submitPicks = document.getElementById('submitcurrentpicks');
    submitPicks.disabled = true;
    let gates = max/min;
    if (num == 0){
        messageDiv.innerHTML = `Click on an empty box to select it`
    }
    else if (num == max){
        messageDiv.innerHTML = `You have selected the <b>maximum</b> picks for this game. Click on <b><i>ENTER PICKS</i></b> to lock them in`;
        submitPicks.disabled = false;
    }
    else if (num>0 && num<max){
        for (let i=gates; i>=0; i--){
            let newMin = max-(min*(i-1))
            if (num == (max-(min*i))){
                messageDiv.innerHTML = `Click on <b><i>ENTER PICKS</i></b> to lock in your <b>${num}</b> pick, or select ${min} more`;
                submitPicks.disabled = false;
             }else if (num>(max-(min*i)) && num<(max-(min*(i-1))) && i!=0){
                messageDiv.innerHTML = `Select <b>${newMin-num}</b> more picks`
            }
        }
    }
}

//API CALLS
async function getTheBoardInfo(boardId){
    const res = await fetch(`/api/board/info/${boardId}`,{
        method:"POST",
        body: JSON.stringify({boardId}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//gets all the picks taken
async function getAllBoardPicks(boardId){
    const res = await fetch(`/api/board/picks/${boardId}`,{
            method:"POST",
            body: JSON.stringify({boardId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

//get the info for the user logged in
async function getCurrentLoggedInUser(userId){
    const res = await fetch(`/api/board/user/${userId}`,{
        method:"POST",
        body: JSON.stringify({userId}),
        headers: { "Content-Type": "application/json" }
    });
return res.json();
}

        


