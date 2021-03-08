let allPlayerDiv = document.getElementById('allplayerinfo');



async function printAllPlayers(){
    allPlayerDiv.innerHTML = '';
    let allPlayers = await getAllPlayers();
    console.log(allPlayers);
    for (let i=0; i<allPlayers.length; i++){
        (i%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        let singlePlayerDiv = document.createElement('div');
        singlePlayerDiv.className = `${bgcolor} singleGame` ;
        let playerSetDiv = document.createElement('div');
        playerSetDiv.className = 'playerset'
        playerSetDiv.setAttribute('id', `player${allPlayers[i].id}`)
        playerSetDiv.appendChild(printEachCol(allPlayers[i].nameFirst, 'md first'));
        playerSetDiv.appendChild(printEachCol(allPlayers[i].nameLast, 'lg'));
        playerSetDiv.appendChild(printEachCol(allPlayers[i].alias, 'lg'));
        playerSetDiv.appendChild(printEachCol(allPlayers[i].email, 'xl'));
        playerSetDiv.appendChild(printEachCol(allPlayers[i].phone, 'md'));
        singlePlayerDiv.appendChild(playerSetDiv);
        let buttonSetDiv = document.createElement('div')
        buttonSetDiv.className='buttonset';
        buttonSetDiv.appendChild(createButton('edit', 'Player','xl', `'${allPlayers[i].id}'`));
        buttonSetDiv.appendChild(createButton('delete', 'Player','xl', `'${allPlayers[i].id}'`));
        singlePlayerDiv.appendChild(buttonSetDiv);
        allPlayerDiv.appendChild(singlePlayerDiv);
    }
}

async function getAllPlayers(){
    const res = await fetch("/api/player/all",{
            method:"POST",
            body: JSON.stringify({adminId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}


async function buttonPlayerEdit(id){
    showThisSection('e', 'Player');
    let player = await getSinglePlayer(id);
    clearAreaById(['editplayerfirst','editplayerlast','editplayeralias','editplayeremail','editplayerphone'], 'html');
    //document.getElementById('editplayerid').innerText = player[0].id;
    document.getElementById('editplayerfirst').appendChild(singlePlayerEdit('first',player[0].nameFirst))
    document.getElementById('editplayerlast').appendChild(singlePlayerEdit('last',player[0].nameLast))
    document.getElementById('editplayeralias').appendChild(singlePlayerEdit('alias',player[0].alias))
    document.getElementById('editplayeremail').appendChild(singlePlayerEdit('email',player[0].email))
    document.getElementById('editplayerphone').appendChild(singlePlayerEdit('phone',player[0].phone))
    let editSaveBtn = document.getElementById('editplayersave')
    editSaveBtn.setAttribute('onclick',`buttonPlayerSave('${player[0].id}')`);
    editSaveBtn.innerText='SAVE';
    let editCancleBtn = document.getElementById('editplayercancle')
    editCancleBtn.setAttribute('onclick',`adminStartPage()`);
    editCancleBtn.innerText='CANCLE';
}

async function buttonPlayerDelete(id){
    await fetch("/api/player/delete",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id})
    });
    setTimeout(function(){ adminStartPage() }, 500);
}

async function getSinglePlayer(id){
    const res = await fetch("/api/player/single",{
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


function singlePlayerEdit(value, sel){
    let editValue = document.createElement('input');
    editValue.className = 'answer';
    (value=='email')?editValue.setAttribute('type','email'):editValue.setAttribute('type','text');
    editValue.setAttribute('id',`edit${value}`);
    editValue.setAttribute('name',`edit${value}`);
    editValue.setAttribute('value',sel);
    return editValue;
}

function buttonPlayerSave(id){
    let firstName = editfirst.value;
    let email = editemail.value;
    let editFirstDiv = document.getElementById('editfirst')
    let editEmailDiv = document.getElementById('editemail')
    console.log(`${firstName} has the email of ${email}`)
    let goOn = (firstName!='' && email!='')? true: false;
    console.log(`GO ON: ${goOn}`)
    if (goOn){
        console.log(`JS ID: ${id} - ${firstName} ${editlast.value} - ${editalias.value} - ${editphone.value} - ${editemail.value} --> ADMIN: ${adminId}`)
        fetch("/api/player/update",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                info:{
                    id:id,
                    firstName:firstName,
                    lastName:editlast.value,
                    alias:editalias.value,
                    email:email,
                    phone:editphone.value,
                    admin:adminId
                }
            })
        })
        goOn=false;
        editFirstDiv.className = 'answer';
        editEmailDiv.className = 'answer';
        setTimeout(function(){ adminStartPage() }, 500);
    }else{
        if (firstName=='') {
            editFirstDiv.setAttribute('placeholder','Enter A Name')
            editFirstDiv.className = 'answer warning';
        }else{
            editFirstDiv.setAttribute('value',firstName);
            editFirstDiv.className = 'answer';
        }
        if (email=='') {
            editEmailDiv.setAttribute('placeholder','Enter An Email Address')
            editEmailDiv.className = 'answer warning';
        }else{
            editEmailDiv.setAttribute('value',email);
            editEmailDiv.className = 'answer';
        } 
    }
}
