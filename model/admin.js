const pool = require("../config/connection");

class Admin {
	constructor(){
		this.pool = pool;
	}

	async getFullSchedule(){
		let query = `SELECT s.id, s.gametime, h.id as hId, h.full_name as hName, h.team_name as hTeam, h.city_name as hCity, h.short_name as hShort, v.id as vId, v.full_name as vName, v.team_name as vTeam, v.city_name as vCity, v.short_name as vShort
		From schedule s 
		INNER JOIN nhl_team h ON h.id = s.home_id
		INNER JOIN nhl_team v ON v.id = s.vis_id
		WHERE s.gametime >= NOW()
		ORDER BY s.id;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async getGameTypes(){
		let query = `SELECT * FROM game_type;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async createGame(date, type, min, max, cost, adminId){
		let query = `INSERT INTO game (date, cost, box_min, box_max, type, admin) VALUES (${date}, ${cost}, ${min}, ${max}, ${type}, ${adminId});`;
		await this.pool.query(query);
		return 1;
	}

	async getAllGames(id){
		let query = `SELECT g.id, s.gametime, t.name as type, g.cost, g.box_min as min, g.box_max as max, concat(vis.team_name," @ ",home.team_name) as game
		From game g 
		INNER JOIN schedule s ON s.id = g.date
		INNER JOIN game_type t ON t.id = g.type
		INNER JOIN nhl_team vis ON vis.id = s.vis_id
		INNER JOIN nhl_team home ON home.id = s.home_id
		WHERE admin = ${id};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}


	
}

module.exports = Admin;