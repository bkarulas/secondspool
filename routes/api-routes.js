const express = require("express");

const Game = require("../model/game");
const Player = require("../model/player");

let game = new Game();
let player = new Player();


let apiRoutes = express.Router();

//admin routes
//GAME
//get all the game schedule info
apiRoutes.get("/schedule", async (req, res) => {
	let result = await game.getFullSchedule();
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO DATES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});

//get all the game type info
apiRoutes.get("/gametype", async (req, res) => {
	let result = await game.getGameTypes();
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO GAME TYPES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});

//create a new game
apiRoutes.post("/game/create", async (req, res) =>{
    let info = req.body.info;
    let result = await game.createGame(info.date, info.type, info.min, info.max, info.cost, info.admin);
	(result==1)?console.log(`*****GAME HAS BEEN ENTERED*****`):("-----SOMTHING WENT WRONG-----");
})

//update a current game
apiRoutes.post("/game/update", async (req, res) =>{
    let info = req.body.info;
	console.log(info);
    let result = await game.updateGame(info.id, info.type, info.min, info.max, info.cost, info.admin);
	(result==1)?console.log(`*****GAME HAS BEEN UPDATED*****`):("-----SOMTHING WENT WRONG-----");
})

//get all the game boards created and active
apiRoutes.post("/game/all", async (req, res) => {
	let adminId = req.body.adminId;
	let result = await game.getAllGames(adminId);
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO GAME GAMES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});

//get a single active game board
apiRoutes.post('/game/single', async (req, res) => {
	let info = req.body.info;
	let result = await game.getOneGame(info.id, info.admin);
	console.log ("result", result[0])
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO GAME GAME WITH THAT ID"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})

//delete a game board
apiRoutes.post("/game/delete", async (req, res) => {
	let id = req.body.id;
	let result = await game.deleteGame(id);
	(result==1)?console.log(`*****GAME ID: ${id} HAS BEEN DELETED*****`):("-----SOMTHING WENT WRONG THE GAME DID NOT DELETE-----");
});

//PLAYER
//create player
apiRoutes.post("/player/create", async (req, res) =>{
    let info = req.body.info;
    let result = await player.createPlayer(info.firstName, info.lastName, info.alias, info.email, info.phone, info.admin);
	(result==1)?console.log(`*****PLAYER HAS BEEN ENTERED*****`):("-----SOMTHING WENT WRONG-----");
})

//get all the active players linked to the admin
apiRoutes.post("/player/all", async (req, res) => {
	let adminId = req.body.adminId;
	let result = await player.getAllPlayers(adminId);
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO PLAYERS"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});

apiRoutes.post('/player/single', async (req, res) => {
	let info = req.body.info;
	let result = await player.getOnePlayer(info.id, info.admin);
	console.log ("result", result[0])
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO PLAYER WITH THAT ID"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})

apiRoutes.post("/player/update", async (req, res) =>{
    let info = req.body.info;
	console.log(info);
	console.log(`API ID: ${info.id} - ${info.firstName} ${info.lastName} - ${info.alias} - ${info.phone} - ${info.email} --> ADMIN: ${info.admin}`)
    let result = await player.updatePlayer(info.id, info.firstName, info.lastName, info.alias, info.email,info.phone, info.admin);
	(result==1)?console.log(`*****PLAYER HAS BEEN UPDATED*****`):("-----SOMTHING WENT WRONG-----");
})

//delete a user
apiRoutes.post("/player/delete", async (req, res) => {
	let id = req.body.id;
	let result = await player.deletePlayer(id);
	(result==1)?console.log(`*****PLAYER ID: ${id} HAS BEEN DELETED*****`):("-----SOMTHING WENT WRONG THE GAME DID NOT DELETE-----");
});

module.exports = apiRoutes;