const pool = require("../config/connection");

class Board {
	constructor(){
		this.pool = pool;
	}

    async getAllTaken(id){
        let query = `SELECT u.id, u.alias, CONCAT(u.name_first,' ',LEFT(u.name_last,1)) AS name, p.sec 
        FROM picks p
        INNER JOIN users u ON p.user = u.id
        WHERE game = ${id}
        ORDER BY p.sec;`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }


    async getBoardInfo(id){
        let query = `SELECT g.id, s.gametime, t.name as type, g.cost, g.box_min as min, g.box_max as max, concat(vis.team_name," @ ",home.team_name) as game
        From game g 
        INNER JOIN schedule s ON s.id = g.date
        INNER JOIN game_type t ON t.id = g.type
        INNER JOIN nhl_team vis ON vis.id = s.vis_id
        INNER JOIN nhl_team home ON home.id = s.home_id
        WHERE g.id = ${id};`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }

    async getUserInfo(id){
        let query = `SELECT id, alias, CONCAT(name_first,' ',LEFT(name_last,1)) AS name, email, phone
        FROM users
        WHERE id = ${id};`;
        try {
            let result = await this.pool.query(query);
            return result;
        }
        catch(error){
            return error;
        }
    }

    async commitThePicks(pick, id, board){
        let query = `INSERT INTO picks (sec, user, game) VALUES `;
        for (let i=0; i<pick.length; i++){
            if ((i+1 == pick.length)){
                query += `(${pick[i]}, ${id}, ${board});`;
            }else{
                query += `(${pick[i]}, ${id}, ${board}), `;
            }
        }
        console.log(`QUERY ${query}`);
        try {
			await this.pool.query(query);
			
            return 1;
		}
		catch(error){
			return error;
		}
    }



}

module.exports = Board;
