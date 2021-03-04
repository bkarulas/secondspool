const key = "615565b71d714f83a11f9ededa6bc302";
const axios = require("axios");


//const config = { headers: {"Authorization": `Bearer ${key}`} }; 


class NHL {
	constructor(){
	}

	async gameBoxScore(gameId) {
        console.log(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live?key=${key}`)
		let res = await axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live?key=${key}`); 
		return res; 
	}





}    

module.exports =  NHL;