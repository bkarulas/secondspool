let newgameSec = document.getElementById('createnewgame');
let newScheduleDiv = document.getElementById('newschedule');
let newTypeDiv = document.getElementById('newtype');
let newMinDiv = document.getElementById('newmin');
let newCostDiv = document.getElementById('newcost');
let newMaxDiv = document.getElementById('newmax');

printNewGameOptions();

//all the game options to build a new game
async function printNewGameOptions(){
    let dates = await getAllSchedules();
    let type = await getAllGameTypes();
    newScheduleDiv.appendChild(getFullSchedule(dates));
    newTypeDiv.appendChild(getTypeOfGame('gametype',type, 1));
    newMinDiv.appendChild(getMinBoxes('boxmin','getNewMaxBoxes', 1));
    newCostDiv.setAttribute('placeholder','$0.00')
    getNewMaxBoxes(0);

}

//gets all future games 
async function getAllSchedules(){
    const res = await fetch("/api/schedule",{
            method:"GET",
    });
    return res.json();
}
//get all game types
async function getAllGameTypes(){
    const res = await fetch("/api/gametype",{
        method:"GET",
    });
    return res.json()
}

//creates the game schedule option dropdown
function getFullSchedule(dates){
    let fullSchedule = document.createElement('select');
    fullSchedule.className ='answer'
    fullSchedule.setAttribute('id','fullschedule');
    fullSchedule.setAttribute('name','fullschedule');
    dates.forEach(date => {
        let eachSchedule = document.createElement('option');
        (date.id%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        eachSchedule.className = bgcolor;
        eachSchedule.setAttribute('value',date.id);
        //gets the dates of each game
        let gameDate = getGameDate(date.gametime, 'short');
        //gets the time of each game
        let gameTime = getGameTime(date.gametime);
        eachSchedule.innerText = `${gameDate} ${gameTime} - ${date.vTeam} @ ${date.hTeam}`;
        fullSchedule.appendChild(eachSchedule);
    });
    return fullSchedule;
}

//create the game type options dropdown
function getTypeOfGame(idTag,types, sel){
    let gameType = document.createElement('select');
    gameType.className='answer';
    gameType.setAttribute('id',`${idTag}`);
    gameType.setAttribute('name',`${idTag}`);
    types.forEach(type => {
        let eachType = document.createElement('option');
        (type.id==sel)?eachType.setAttribute('selected','selected'):'';
        (type.id%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        eachType.className = bgcolor;
        eachType.setAttribute('value',type.id);
        eachType.innerText = type.name
        gameType.appendChild(eachType);
    });
    return gameType;
}

//creates the min amont of boxes drop down
function getMinBoxes(idTag, pageSec, sel){
    let boxMin = document.createElement('select');
    boxMin.className='answer';
    boxMin.setAttribute('id',`${idTag}`);
    boxMin.setAttribute('name',`${idTag}`);
    boxMin.setAttribute('onchange',`${pageSec}(this.value)`)
    for (let i=0; i<minBoxes.length; i++){
        let eachMin = document.createElement('option');
        (i%2) ? bgcolor = 'optionlight': bgcolor = 'optiondark';
        eachMin.className = `${bgcolor}`;
        (minBoxes[i]==sel)?eachMin.setAttribute('selected','selected'):'';
        eachMin.setAttribute('value',i);
        eachMin.innerText = minBoxes[i]
        boxMin.appendChild(eachMin);
    }
    return boxMin;
}

//creates the max amont of boxes drop down arroding to the min
function getNewMaxBoxes(minValue){
    newMaxDiv.innerHTML = '';
    let boxMax = document.createElement('select');
    boxMax.className = 'answer';
    boxMax.setAttribute('id','boxmax');
    boxMax.setAttribute('name','boxmax');
    let boxArr = maxBoxes[minValue];
    for (let i=0; i<boxArr.length; i++){
        let eachMax = document.createElement('option');
        (i%2) ? bgcolor = 'optionlight': bgcolor = 'optiondark';
        eachMax.className = bgcolor;
        eachMax.setAttribute('value',i);
        eachMax.innerText = boxArr[i]
        boxMax.appendChild(eachMax);
    }
    newMaxDiv.appendChild(boxMax);
}

function createNewGame(){
    cost = parseInt(newcost.value)//.substring(0, price.value.indexOf('.'))).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    if (cost>0){
        console.log('COST IS GOOD');
        fetch("api/game/create",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                info:{
                    date:fullschedule.value,
                    type:gametype.value,
                    min:minBoxes[boxmin.value],
                    max:maxBoxes[boxmin.value][boxmax.value],
                    cost:cost,
                    admin:adminId
                }
            })
        })
        newCostDiv.className='answer';
        newCostDiv.setAttribute('placeholder', '$0.00');
    }else{
        console.log('NO MONEY')
        newCostDiv.className='warning answer';
        newCostDiv.setAttribute('placeholder', 'Enter In An Amount');
    }
    setTimeout(function(){ printAllGames(adminId) }, 500);
}
