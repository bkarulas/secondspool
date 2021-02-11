createTheBoard();

function createTheBoard(){
    let fullBlockDiv = document.getElementById('fullblock');
    for (i=0; i<60; i++){
        (i<10)? time = "0"+i.toString():time=i.toString();
        //main block
        let singleBlockDiv = document.createElement('div');
        singleBlockDiv.className = 'singleblock';
        singleBlockDiv.setAttribute('id', `block${time}`);
        //time box
        let timeDiv = document.createElement('div');
        timeDiv.className = 'boardtime';
        timeDiv.setAttribute('id', `time${time}`);
        timeDiv.innerText = time;
        singleBlockDiv.appendChild(timeDiv);
        //name box
        let nameDiv = document.createElement('div');
        nameDiv.className = 'boardname';
        nameDiv.setAttribute('id', `name${time}`);
        nameDiv.innerText = 'John D';
        singleBlockDiv.appendChild(nameDiv);
        //add it
        fullBlockDiv.appendChild(singleBlockDiv);
    }
}