const pool = require("../config/connection");

class Login {
	constructor(){
		this.pool = pool;
	}

	
	//get a single game by ID
	async getUserId(email, board){
		let query = `SELECT u.id FROM users u
        INNER JOIN game g ON g.admin = u.admin
        WHERE u.email = '${email}' AND g.id =${board} AND u.act=1 AND g.act=1;`
		try {
			let result = await this.pool.query(query);
            console.log(result[0]);
			return result;
		}
		catch(error){
			return error;
		}
	}

	
}

module.exports = Login;