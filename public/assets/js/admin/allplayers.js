let allPlayerDiv = document.getElementById('allplayerinfo');



async function printAllPlayers(adminId){
    allPlayerDiv.innerHTML = '';
    let allPlayers = await getAllPlayers(adminId);
    console.log(allPlayers);
    for (let i=0; i<allPlayers.length; i++){
        (i%2) ? bgcolor = 'optiondark': bgcolor = 'optionlight';
        let singlePlayerDiv = document.createElement('div');
        singlePlayerDiv.className = `${bgcolor} singleGame` ;
        let infoSet = document.createElement('div');
        infoSet.className = 'infoset'
        infoSet.setAttribute('id', `player${allPlayers[i].id}`)
        infoSet.appendChild(printEachCol(allPlayers[i].id, 'xs'))
        infoSet.appendChild(printEachCol(allPlayers[i].nameFirst, 'md'));
        infoSet.appendChild(printEachCol(allPlayers[i].nameLast, 'lg'));
        infoSet.appendChild(printEachCol(allPlayers[i].alias, 'lg'));
        infoSet.appendChild(printEachCol(allPlayers[i].email, 'xl'));
        infoSet.appendChild(printEachCol(allPlayers[i].phone, 'md'));
        singlePlayerDiv.appendChild(infoSet);
        let buttonSet = document.createElement('div')
        buttonSet.className='buttonset';
        buttonSet.appendChild(createButton('edit', 'Player','xl', allPlayers[i].id));
        buttonSet.appendChild(createButton('delete', 'Player','xl', allPlayers[i].id));
        singlePlayerDiv.appendChild(buttonSet);
        allPlayerDiv.appendChild(singlePlayerDiv);
    }
}

async function getAllPlayers(adminId){
    const res = await fetch("/api/player/all",{
            method:"POST",
            body: JSON.stringify({adminId}),
            headers: { "Content-Type": "application/json" }
    });
    return res.json();
}


async function buttonPlayerEdit(id){
    showThisSection('e', 'Player');
    let player = await getSinglePlayer(id, adminId);
    clearAreaById(['editplayerid','editplayerfirst','editplayerlast','editplayeralias','editplayeremail','editplayerphone'], 'html');
    document.getElementById('editplayerid').innerText = player[0].id;
    document.getElementById('editplayerfirst').appendChild(singlePlayerEdit('first',player[0].nameFirst))
    document.getElementById('editplayerlast').appendChild(singlePlayerEdit('last',player[0].nameLast))
    document.getElementById('editplayeralias').appendChild(singlePlayerEdit('alias',player[0].alias))
    document.getElementById('editplayeremail').appendChild(singlePlayerEdit('email',player[0].email))
    document.getElementById('editplayerphone').appendChild(singlePlayerEdit('phone',player[0].phone))
    let editSaveBtn = document.getElementById('editplayersave')
    editSaveBtn.setAttribute('onclick',`buttonPlayerSave(${player[0].id})`);
    editSaveBtn.innerText='SAVE';
    let editCancleBtn = document.getElementById('editplayercancle')
    editCancleBtn.setAttribute('onclick',`adminStartPage(${adminId})`);
    editCancleBtn.innerText='CANCLE';
}

async function buttonPlayerDelete(id){
    await fetch("api/player/delete",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id})
    });
    setTimeout(function(){ adminStartPage(adminId) }, 500);
    //setTimeout(function(){ printAllPlayers(adminId) }, 500);
}

async function getSinglePlayer(id, admin){
    const res = await fetch("/api/player/single",{
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


function singlePlayerEdit(value, sel){
    let editValue = document.createElement('input');
    editValue.className = 'answer';
    editValue.setAttribute('type','text');
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
        fetch("api/player/update",{
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
        //setTimeout(function(){ printAllPlayers(adminId) }, 500);
        setTimeout(function(){ adminStartPage(adminId) }, 500);
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
