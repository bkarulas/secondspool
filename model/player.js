const pool = require("../config/connection");

class Player {
	constructor(){
		this.pool = pool;
	}

	//create a new player
	async createPlayer(id, firstName, lastName, alias, email, phone, admin){
		let query = `INSERT INTO users (id, alias, name_first, name_last, email, phone, admin) VALUES ('${id}','${alias}', '${firstName}', '${lastName}', '${email}', '${phone}', '${admin}');`;
		console.log(query)
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

	async getAllPlayers(id){
		let query = `SELECT id, alias, name_first AS nameFirst, name_last AS nameLast, email, phone
		FROM users
		WHERE admin = '${id}' AND act=1
		ORDER BY created;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async getOnePlayer(id, admin){
		let query = `SELECT id, alias, name_first AS nameFirst, name_last AS nameLast, email, phone
		From users
		WHERE admin = '${admin}' AND id = '${id}';`
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	//update a game
	async updatePlayer(id, firstName, lastName, alias, email, phone, adminId){
		let query = `UPDATE users SET name_first='${firstName}', name_last='${lastName}', alias='${alias}', email='${email}', phone='${phone}'
		WHERE admin = '${adminId}' AND id='${id}';`;
		console.log(query);
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

	async deletePlayer(id){
		let query = `UPDATE users SET act = 0 WHERE id = '${id}';`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

	
}

module.exports = Player;