let allGameDiv = document.getElementById('allgameinfo');


async function printAllGames(){
    allGameDiv.innerHTML = '';
    let allGames = await getAllGames();
    console.log(allGames);
    for (let i=0; i<allGames.length; i++){
        (i%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        let singleGameDiv = document.createElement('div');
        singleGameDiv.className = `${bgcolor} singleGame` ;
        console.log(allGames[i].id)
        let taken =  await boxesTaken(allGames[i].id);
        console.log(taken[0].taken);
        let gameSetDiv = document.createElement('div');
        gameSetDiv.className = 'gameset'
        gameSetDiv.setAttribute('id', `game${allGames[i].id}`)
        gameSetDiv.appendChild(printEachCol(allGames[i].id, 'xs'));
        gameSetDiv.appendChild(printEachCol(`${getGameDate(allGames[i].gametime, 'short')} - ${getGameTime(allGames[i].gametime)}`, 'md'));
        gameSetDiv.appendChild(printEachCol(allGames[i].game, 'xl'));
        gameSetDiv.appendChild(printEachCol(allGames[i].type, 'lg'));
        gameSetDiv.appendChild(printEachCol(allGames[i].min, 'xs'));
        gameSetDiv.appendChild(printEachCol(allGames[i].max, 'sm'));
        gameSetDiv.appendChild(printEachCol(`$${allGames[i].cost}`, 'sm'));
        gameSetDiv.appendChild(printEachCol(taken[0].taken, 'sm'));
        singleGameDiv.appendChild(gameSetDiv);
        let buttonSetDiv = document.createElement('div')
        buttonSetDiv.className='buttonset';
        buttonSetDiv.appendChild(createButton('info','Game','lg', allGames[i].id));
        buttonSetDiv.appendChild(createButton('edit','Game', 'lg', allGames[i].id));
        buttonSetDiv.appendChild(createButton('fill','Game', 'lg', allGames[i].id));
        buttonSetDiv.appendChild(createButton('delete','Game', 'lg', allGames[i].id));
        singleGameDiv.appendChild(buttonSetDiv);
        let infoSetDiv = document.createElement('div');
        infoSetDiv.className='infoset';
        infoSetDiv.setAttribute('id',`info${allGames[i].id}`);
        // infoSetDiv.style.display = 'none'
        singleGameDiv.appendChild(infoSetDiv);
        allGameDiv.appendChild(singleGameDiv);
    }
}

//button delete game
async function buttonGameDelete(id){
    await fetch("/api/game/delete",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id})
    }); 
    setTimeout(function(){ adminStartPage() }, 500);  
}

//button game info
async function buttonGameInfo(gameId){
    let gameInfo = await getAllGameInfo(gameId)
    gameInfoDiv = document.getElementById(`info${gameId}`)
    gameInfoDiv.innerHTML = '';
    if (gameInfoDiv.style.display == 'block'){
        gameInfoDiv.style.display='none';
    }else{
        let titleDiv = document.createElement('div');
        titleDiv.className='infosecsubtitle'
        titleDiv.appendChild(printEachCol('Alias','lg'))
        titleDiv.appendChild(printEachCol('Name','lg'));
        titleDiv.appendChild(printEachCol('Taken','md'));
        titleDiv.appendChild(printEachCol('Owing','md'));
        titleDiv.appendChild(printEachCol('Paid','md'));
        titleDiv.appendChild(printEachCol('Owning','md'));
        gameInfoDiv.appendChild(titleDiv);
        gameInfo.forEach(info => {
            let infoDiv = document.createElement('div');
            infoDiv.className='infosinglegame';
            infoDiv.className='infoset'
            infoDiv.appendChild(printEachCol(info.alias,'lg'))
            infoDiv.appendChild(printEachCol(info.name,'lg'));
            infoDiv.appendChild(printEachCol(info.taken,'md'));
            infoDiv.appendChild(printEachCol(`$${(info.taken/info.min)*info.cost}`,'md'));
            infoDiv.appendChild(printEachCol('--','md'));
            infoDiv.appendChild(printEachCol('--','md'));
            gameInfoDiv.appendChild(infoDiv);
            gameInfoDiv.style.display='block'
        });
    }
}

//button edit game
async function buttonGameEdit(id){
    showThisSection('e', 'Game');
    let game = await getSingleGame(id);
    console.log(game[0]);
    //id
    let editIdDiv = document.getElementById('editid');
    editIdDiv.innerText = '';
    editIdDiv.innerText = game[0].id;
    //date
    let editDateDiv = document.getElementById('editdate');
    editDateDiv.innerText = '';
    editDateDiv.innerText = (`${getGameDate(game[0].gametime, 'short')} - ${getGameTime(game[0].gametime)}`);
    //game
    let editGameDiv = document.getElementById('editteam');
    editGameDiv.innerText = '';
    editGameDiv.innerText = (game[0].game);
    //type
    let editTypeDiv = document.getElementById('edittype');
    editTypeDiv.innerText = '';
    let type = await getAllGameTypes();
    editTypeDiv.appendChild(getTypeOfGame('editboxtype', type, game[0].type));
    //min
    let editMinDiv = document.getElementById('editmin');
    editMinDiv.innerText = '';
    editMinDiv.appendChild(getMinBoxes('editboxmin','getEditMaxBoxes',game[0].min))
    //max
    getEditMaxBoxes(minBoxes.indexOf(game[0].min), game[0].max)
    //cost
    let editCostDiv = document.getElementById('editcost');
    editCostDiv.innerText = '';
    editCostDiv.appendChild(editGameCost(game[0].cost));
    //save button
    let editSaveDiv = document.getElementById('editsave');
    editSaveDiv.setAttribute('onclick',`buttonGameSave(${game[0].id})`)
    editSaveDiv.innerText='SAVE'
    //cancle button
    let editCancleDiv = document.getElementById('editcancle');
    editCancleDiv.setAttribute('onclick',`adminStartPage()`)
    editCancleDiv.innerText='CANCEL'

}

//get the new MAX
function getEditMaxBoxes(minValue, sel){
    let editMaxDiv =document.getElementById('editmax')
    editMaxDiv.innerHTML = '';
    let boxMax = document.createElement('select');
    boxMax.setAttribute('id','editboxmax');
    boxMax.setAttribute('name','editboxmax');
    let boxArr = maxBoxes[minValue];
    for (let i=0; i<boxArr.length; i++){
        let eachMax = document.createElement('option');
        (boxArr[i]==sel)?eachMax.setAttribute('selected','selected'):'';
        (i%2) ? bgcolor = 'optionlight': bgcolor = 'optiondark';
        eachMax.className = bgcolor;
        eachMax.setAttribute('value',i);
        eachMax.innerText = boxArr[i]
        boxMax.appendChild(eachMax);
    }
    editMaxDiv.appendChild(boxMax);
}

function editGameCost(sel){
    let price = document.createElement('input');
    price.className = 'colhf';
    price.setAttribute('type','text');
    price.setAttribute('id','editprice');
    price.setAttribute('name','editprice');
    price.setAttribute('value',sel);
    return price;
}

//update the game edited
function buttonGameSave(id){
    console.log(editprice.value);
    console.log("min "+editboxmin.value)
    console.log("Max "+editboxmax.value)
    console.log("Type"+editboxtype.value);
    cost = parseInt(editprice.value)//.substring(0, price.value.indexOf('.'))).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    if (cost>0){
        console.log('COST IS GOOD');
        fetch("/api/game/update",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                info:{
                    id:id,
                    type:editboxtype.value,
                    min:minBoxes[editboxmin.value],
                    max:maxBoxes[editboxmin.value][editboxmax.value],
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
    setTimeout(function(){ adminStartPage() }, 500);
}


//DB CALLS
//get the single game info

async function getAllGameInfo(game){
    const res = await fetch("/api/game/info",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            info:{
                game: game,
                admin: adminId
            }
        })
    });
    return res.json();
}

async function getAllGames(){
    const res = await fetch("/api/game/all",{
            method:"POST",
            body: JSON.stringify({adminId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

async function boxesTaken(id){
    const res = await fetch("/api/game/taken", {
        method:"POST",
        body: JSON.stringify({id}),
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

async function getSingleGame(id){
    const res = await fetch("/api/game/single",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            info:{
                id: id,
                admin: adminId
            }
        })
    });
    return res.json();
}






