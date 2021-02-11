const express = require("express");

const Admin = require("../model/admin");

let admin = new Admin();


let apiRoutes = express.Router();

//admin routes
apiRoutes.get("/schedule", async (req, res) => {
	let adminResult = await admin.getFullSchedule();
	if (adminResult[0]) {
		if (adminResult[0].length > 0) {
			res.json(adminResult[0]);
		} else {
			res.json({"error":"NO DATES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});


apiRoutes.get("/gametype", async (req, res) => {
	let adminResult = await admin.getGameTypes();
	if (adminResult[0]) {
		if (adminResult[0].length > 0) {
			res.json(adminResult[0]);
		} else {
			res.json({"error":"NO GAME TYPES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});

apiRoutes.post("/creategame", async (req, res) =>{
    let game = req.body.game;
	console.log(`**********DATE: ${game.date}**********`);
    let theNewGame = await admin.createGame(game.date, game.type, game.min, game.max, game.cost, game.admin);
	(theNewGame==1)?console.log("IT'S IN"):("SOMTHING WENT WRONG");
})

apiRoutes.post("/allgames", async (req, res) => {
	let adminId = req.body.adminId;
	let adminResult = await admin.getAllGames(adminId);
	if (adminResult[0]) {
		if (adminResult[0].length > 0) {
			res.json(adminResult[0]);
		} else {
			res.json({"error":"NO GAME GAMES"});
		}
	} else {
		res.json({"error":"SQL query returned undefined result"});
	}
});


module.exports = apiRoutes;