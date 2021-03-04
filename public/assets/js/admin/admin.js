const allGamesSec = document.getElementById('viewallgames');
const editGameSec = document.getElementById('editgame');
const creatGameSec = document.getElementById('createnewgame');
const allPlayerSec = document.getElementById('allplayer');
const editPlayerSec = document.getElementById('editplayer');
const creatPlayerSec = document.getElementById('createnewplayer');
const GameSec = document.getElementById('games');
const PlayerSec = document.getElementById('players');
const newPlayerBtn = document.getElementById('newplayerbutton');
const newGameBtn = document.getElementById('newgamebutton');

//GENERAL PRINT OPTIONS
//prints each game info coloum
function printEachCol(info, width){
    let currentCol = document.createElement('div');
    currentCol.className = `col${width}`;
    currentCol.innerText = info;
    return currentCol;
}

//GENERAL PRINT OPTIONS
//prints the buttons for each game
function createButton(info, sec, width, id){
    let buttonCol = document.createElement('button')
    buttonCol.className = `${info}button col${width}`;
    buttonCol.setAttribute('onclick', `button${sec}${info[0].toUpperCase() + info.substring(1)}(${id})`);
    buttonCol.setAttribute('value',`${info}`);
    buttonCol.innerText = info.toUpperCase();
    return buttonCol;
}

function clearAreaById(allId, part){
    allId.forEach(id => {
        let currentID = document.getElementById(id)
        if (part=='html'){
            currentID.innerHTML='';
        }else if (part=='value'){
            currentID.value='';
        }else if (part=='child'){
            currentID.removeChild(currentID.lastChild);
        }
    });
}


