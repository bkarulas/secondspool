
printTheBoardInfo(boardId)

async function printTheBoardInfo(boardId){
    let boardInfo = await getTheBoardInfo(boardId);
    printEachInfoLine('game', boardInfo[0].game);
    printEachInfoLine('datetime', printDateTime(boardInfo[0].gametime));
    printEachInfoLine('type', boardInfo[0].type);
    printEachInfoLine('minmax', `${boardInfo[0].min} Min-${boardInfo[0].max} Max`);
    (boardInfo[0].min>1? box='Boxes':box='Box')
    printEachInfoLine('cost', `$${boardInfo[0].cost} / ${boardInfo[0].min} ${box}`);
}




function printEachInfoLine(divId, divInfo){
    let infoDiv = document.getElementById(`info${divId}`);
    infoDiv.innerText = divInfo;
}

function printDateTime(gameTime){
    return (`${getGameDate(gameTime, 'short')} at ${getGameTime(gameTime)}`);
}

