let allGameDiv = document.getElementById('allgameinfo');

printAllGames(adminId)

async function printAllGames(adminId){
    let allGames = await getAllGames(adminId);
    console.log(allGames);
    for (let i=0; i<allGames.length; i++){
        (i%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        let singleGameDiv = document.createElement('div');
        singleGameDiv.className = `${bgcolor} singleGame` ;
        singleGameDiv.setAttribute('id', `game${allGames[i].id}`)
        singleGameDiv.appendChild(printEachCol(allGames[i].id, 'xs'));
        singleGameDiv.appendChild(printEachCol((`${getGameDate(allGames[i].gametime, 'short')} - ${getGameTime(allGames[i].gametime)}`), 'md'));
        singleGameDiv.appendChild(printEachCol(allGames[i].game, 'md'));
        singleGameDiv.appendChild(printEachCol(allGames[i].type, 'md'));
        singleGameDiv.appendChild(printEachCol(allGames[i].min, 'sm'));
        singleGameDiv.appendChild(printEachCol(allGames[i].max, 'sm'));
        singleGameDiv.appendChild(printEachCol(`$${allGames[i].cost}`, 'sm'));
        allGameDiv.appendChild(singleGameDiv);
    }
}

async function getAllGames(adminId){
    const res = await fetch("/api/allgames",{
            method:"POST",
            body: JSON.stringify({adminId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}

function printEachCol(info, width){
    let currentCol = document.createElement('div');
    currentCol.className = `col${width}`;
    currentCol.innerText = info;
    return currentCol;
}
