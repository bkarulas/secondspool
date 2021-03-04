adminStartPage(adminId);

function adminStartPage(adminId){
    GameSec.style.display = 'block';
    PlayerSec.style.display = 'block';
    allGamesSec.style.display = 'block';
    allPlayerSec.style.display = 'block';
    newPlayerBtn.style.display = 'block';
    newGameBtn.style.display = 'block';
    editGameSec.style.display = 'none';
    editPlayerSec.style.display = 'none';
    creatGameSec.style.display = 'none';
    creatPlayerSec.style.display = 'none';
    printAllGames(adminId)
    printAllPlayers(adminId)
}

function showThisSection(sec, main){
    if (main=='Game'){
        PlayerSec.style.display = 'none';
        allGamesSec.style.display = 'none';
        if (sec=='e'){
            editGameSec.style.display = 'block';
            creatGameSec.style.display = 'none';
        }else if (sec=='c'){
            creatGameSec.style.display = 'block';
            editGameSec.style.display = 'none';
        }
    }else if(main=='Player'){
        GameSec.style.display = 'none';
        allPlayerSec.style.display = 'none';
        if (sec=='e'){
            editPlayerSec.style.display = 'block';
            creatPlayerSec.style.display = 'none';
        }else if (sec=='c'){
            creatPlayerSec.style.display = 'block';
            editPlayerSec.style.display = 'none';
        }
    }
    newPlayerBtn.style.display = 'none';
    newGameBtn.style.display = 'none';
}

function showThisNewGameSection(){
    creatGameSec.style.display = 'block';

}