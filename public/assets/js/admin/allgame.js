let allGameDiv = document.getElementById('allgameinfo');


async function printAllGames(adminId){
    allGameDiv.innerHTML = '';
    let allGames = await getAllGames(adminId);
    console.log(allGames);
    for (let i=0; i<allGames.length; i++){
        (i%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        let singleGameDiv = document.createElement('div');
        singleGameDiv.className = `${bgcolor} singleGame` ; 
        let infoSet = document.createElement('div');
        infoSet.className = 'infoset'
        infoSet.setAttribute('id', `game${allGames[i].id}`)
        infoSet.appendChild(printEachCol(allGames[i].id, 'xs'));
        infoSet.appendChild(printEachCol(`${getGameDate(allGames[i].gametime, 'short')} - ${getGameTime(allGames[i].gametime)}`, 'md'));
        infoSet.appendChild(printEachCol(allGames[i].game, 'xl'));
        infoSet.appendChild(printEachCol(allGames[i].type, 'lg'));
        infoSet.appendChild(printEachCol(allGames[i].min, 'xs'));
        infoSet.appendChild(printEachCol(allGames[i].max, 'sm'));
        infoSet.appendChild(printEachCol(`$${allGames[i].cost}`, 'sm'));
        infoSet.appendChild(printEachCol('30', 'sm'));
        singleGameDiv.appendChild(infoSet);
        let buttonSet = document.createElement('div')
        buttonSet.className='buttonset';
        buttonSet.appendChild(createButton('info','Game','lg', allGames[i].id));
        buttonSet.appendChild(createButton('edit','Game', 'lg', allGames[i].id));
        buttonSet.appendChild(createButton('fill','Game', 'lg', allGames[i].id));
        buttonSet.appendChild(createButton('delete','Game', 'lg', allGames[i].id));
        singleGameDiv.appendChild(buttonSet);
        allGameDiv.appendChild(singleGameDiv);
        
    }
}

async function getAllGames(adminId){
    const res = await fetch("/api/game/all",{
            method:"POST",
            body: JSON.stringify({adminId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}



async function buttonGameDelete(id){
    await fetch("api/game/delete",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id})
    }); 
    setTimeout(function(){ adminStartPage(adminId) }, 500);  
}

async function buttonGameEdit(id){
    showThisSection('e', 'Game');
    let game = await getSingleGame(id, adminId);
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
    editCancleDiv.setAttribute('onclick',`adminStartPage(${adminId})`)
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

//DB CALLS
//get the single game info
async function getSingleGame(id, admin){
    const res = await fetch("/api/game/single",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            info:{
                id: id,
                admin: admin
            }
        })
});
return res.json();
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
        fetch("api/game/update",{
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
    //adminStartPage(adminId);
    setTimeout(function(){ adminStartPage(adminId) }, 500);
}




