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
    newTypeDiv.appendChild(getTypeOfGame(type));
    newMinDiv.appendChild(getMinBoxes());
    newCostDiv.appendChild(getThePrice('$0.00'));
    getMaxBoxes(0);

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
function getTypeOfGame(types){
    let gameType = document.createElement('select');
    gameType.setAttribute('id','gametype');
    gameType.setAttribute('name','gametype');
    types.forEach(type => {
        let eachType = document.createElement('option');
        (type.id%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        eachType.className = bgcolor;
        eachType.setAttribute('value',type.id);
        eachType.innerText = type.name
        gameType.appendChild(eachType);
    });
    return gameType;
}

//creates the min amont of boxes drop down
function getMinBoxes(){
    let boxMin = document.createElement('select');
    boxMin.setAttribute('id','boxmin');
    boxMin.setAttribute('name','boxmin');
    boxMin.setAttribute('onchange','getMaxBoxes(this.value)')
    for (let i=0; i<minBoxes.length; i++){
        let eachMin = document.createElement('option');
        (i%2) ? bgcolor = 'optionlight': bgcolor = 'optiondark';
        eachMin.className = bgcolor;
        eachMin.setAttribute('value',i);
        eachMin.innerText = minBoxes[i]
        boxMin.appendChild(eachMin);
    }
    return boxMin;
}

//creates the max amont of boxes drop down arroding to the min
function getMaxBoxes(minValue){
    newMaxDiv.innerHTML = '';
    let boxMax = document.createElement('select');
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

//creat the cost per min
function getThePrice(placeHolder){
    let price = document.createElement('input');
    price.setAttribute('type','text');
    price.setAttribute('id','price');
    price.setAttribute('name','price');
    price.setAttribute('placeholder',placeHolder);
    return price;
}

function createNewGame(){
    cost = parseInt(price.value)//.substring(0, price.value.indexOf('.'))).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    if (cost>0){
        console.log('COST IS GOOD');
        fetch("api/creategame",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                game:{
                    date:fullschedule.value,
                    type:gametype.value,
                    min:minBoxes[boxmin.value],
                    max:maxBoxes[boxmin.value][boxmax.value],
                    cost:cost,
                    admin:adminId
                }
            })
        })
    }else{
        console.log('NO MONEY')
        newCostDiv.innerHTML = '';
        newCostDiv.appendChild(getThePrice('Enter in amount'));
    }
}

// function createNewGame(){
//     let date = fullschedule.value;
//     let type = gametype.value;
//     let min = boxmin.value;
//     let max = boxmax.value;
//     let cost = 0;
//     admin=adminId;
//     cost = parseInt(price.value)//.substring(0, price.value.indexOf('.'))).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
//     console.log(`COST: ${cost}`)
//     if (cost>0){
//         console.log(`Date: ${date}, Type: ${type}, Min: ${min}, Max: ${max}, Cost:${cost}`)
//         let newGame = async () => {
//             const res = await fetch("api/creategame", {
//                 method: 'POST',
//                 body: JSON.stringify({date, type, min, max, cost, admin}),
//                 headers: {"Content-Type": "application/json"}
//             });
//             return res.json();
//         }

//         newGame().then((res) =>{
//             console.log(res);
//         })
//     }else{
//         console.log('NO MONEY')
//         newCostDiv.innerHTML = '';
//         newCostDiv.appendChild(getThePrice('Enter in amount'));
//     }
// }
