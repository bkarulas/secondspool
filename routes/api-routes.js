const express = require("express");

//const Pick = require("../model/pick");
const Game = require("../model/game");
const Player = require("../model/player");
const Board = require("../model/board");
const Login = require("../model/login");


//let pick = new Pick();
let game = new Game();
let player = new Player();
let board = new Board();
let login = new Login();


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
	await (result==1)?res.status(200).send('GAME WAS ENTERED'):res.status(500).send("SOMTHING WENT WRONG");
})

//update a current game
apiRoutes.post("/game/update", async (req, res) =>{
    let info = req.body.info;
    let result = await game.updateGame(info.id, info.type, info.min, info.max, info.cost, info.admin);
	await (result==1)?res.status(200).send('GAME WAS UPDATED'):res.status(500).send("SOMTHING WENT WRONG");;
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
	await (result==1)?res.status(200).send('GAME WAS DELETED'):res.status(500).send("SOMTHING WENT WRONG");
});

//PLAYER
//create player
apiRoutes.post("/player/create", async (req, res) =>{
    let info = req.body.info;
    let result = await player.createPlayer(info.firstName, info.lastName, info.alias, info.email, info.phone, info.admin);
	await (result==1)?res.status(200).send('PLAYER WAS CREATED'):res.status(500).send("SOMTHING WENT WRONG");
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
    let result = await player.updatePlayer(info.id, info.firstName, info.lastName, info.alias, info.email,info.phone, info.admin);
	await (result==1)?res.status(200).send('PLAYER WAS UPDATED'):res.status(500).send("SOMTHING WENT WRONG");
})

//delete a user
apiRoutes.post("/player/delete", async (req, res) => {
	let id = req.body.id;
	let result = await player.deletePlayer(id);
	await (result==1)?res.status(200).send('PLAYER WAS DELETED'):res.status(500).send("SOMTHING WENT WRONG");
});


//BOARD
//get all picks for a board
apiRoutes.post("/board/picks/:id", async (req, res) => {
	let id = req.params.id
	let result = await board.getAllTaken(id);
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json([{"id":0}]);
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})

//get the general board info
apiRoutes.post('/board/info/:id', async (req, res) => {
	let id = req.params.id;
	let result = await board.getBoardInfo(id);
	if (result[0]) {
		if (result[0].length > 0) {
			res.json(result[0]);
		} else {
			res.json({"error":"NO BOARD"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})

//get the user that is logged in
apiRoutes.post('/board/user/:id', async (req, res) => {
	let id = req.params.id;
	let result = await board.getUserInfo(id);
	if (result[0]) {
		if (result[0].length > 0) {
			await  res.json(result[0]);
		} else {
			res.json({"error":"NO BOARD"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})

apiRoutes.post("/board/enterpicks", async (req, res) =>{
    let picks = req.body.pick;
	let userId = req.body.userId;
	let boardId = req.body.boardId;
	let result = await board.commitThePicks(picks, userId, boardId)
	await (result==1)?res.status(200).send('PICKS WERE ENTERED'):res.status(500).send("SOMTHING WENT WRONG");
})

//LOGIN
//user login
apiRoutes.post('/login/user', async (req, res) => {
	let user = req.body.info.user;
	let board = req.body.info.board;
	let result = await login.getUserId(user, board);
	console.log("API")
	console.log(result[0])
	!result[0]?newReult='TextRow { id: 0 }':newReult=result[0]
	console.log("New Result")
	console.log(newReult);
	console.log("LENGTH")
	console.log(result[0].length);
	if (result[0]) {
		//if (result[0].length > 0) {
			res.json(result[0]);
		// } else {
		// 	res.json({"id":"NO USER"});
		// }
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
})


module.exports = apiRoutes;