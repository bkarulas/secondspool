// MySQL connection 
const mysql = require("mysql2/promise");
require('dotenv').config();

let	pool = mysql.createPool({
		// host: process.env.DB_HOST ,
		// database: process.env.DB_NAME ,
		// port: process.env.DB_PORT ,
		// user: process.env.DB_USER ,
		// password: process.env.DB_PASSWORD
		host: 'localhost',
		database: 'franbrad_hkypool',
		port: '3306',
		user: 'franbrad_hkyadmin' ,
		password: 'T0R0Nt)4&'

	});

module.exports = pool;
