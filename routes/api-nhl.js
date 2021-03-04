const { response } = require("express");
const express = require("express");

const NHL = require("../model/nhlstats");

let nhl = new NHL();


let apiNHL = express.Router();



//NHL STATS

apiNHL.get("/boxscore", async function(req, res){
    console.log("API")
	let gameId = '2020020262';
	response = await nhl.gameBoxScore(gameId);
	res.json(results);
});


module.exports = apiNHL;