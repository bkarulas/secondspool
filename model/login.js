const pool = require("../config/connection");

class Login {
	constructor(){
		this.pool = pool;
	}

	
	//get user id
	async getUserId(email, board){
		let query = `SELECT u.id FROM users u
        INNER JOIN game g ON g.admin = u.admin
        WHERE u.email = '${email}' AND g.id =${board} AND u.act=1 AND g.act=1;`
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	//get admin ID
	async getAdminId(email, pword){
		let query = `SELECT p.admin from adminpw p
		INNER JOIN admin a ON p.admin=a.id
		WHERE a.email = '${email}' AND p.pword = '${pword}';`
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	
}

module.exports = Login;