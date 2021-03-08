

function newPlayerButton(){
    clearAreaById(['newfirstname','newlastname','newusername','newemail','newphone'], 'value');
    document.getElementById('newplayerbutton').style.display='none';
    showThisSection('c', 'Player');
    document.getElementById('newplayercanclebtn').setAttribute('onclick', `adminStartPage(${adminId})`)
}

function createNewUser(){
    let newFirstNameDiv = document.getElementById('newfirstname');
    let newEmailDiv = document.getElementById('newemail');
    let firstName = newfirstname.value;
    let email = newemail.value;
    let goOn = (firstName!='' && email!='')? true: false;
    if (goOn){
        fetch("/api/player/create",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                info:{
                    firstName:firstName,
                    lastName:newlastname.value,
                    alias:newusername.value,
                    email:email,
                    phone:newphone.value,
                    admin:adminId
                }
            })
        })
        goOn=false;
        newFirstNameDiv.className = 'answer';
        newEmailDiv.className = 'answer';
        setTimeout(function(){ adminStartPage() }, 500);
    }else{
        if (firstName=='') {
            newFirstNameDiv.setAttribute('placeholder','Enter A Name')
            newFirstNameDiv.className = 'answer warning';
        }else{
            newFirstNameDiv.setAttribute('value',newfirstname);
        }
        if (email=='') {
            newEmailDiv.setAttribute('placeholder','Enter An Email Address')
            newEmailDiv.className = 'answer warning';
        }else{
            newEmailDiv.setAttribute('value',email);
        } 
    }
}

