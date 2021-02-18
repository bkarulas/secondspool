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