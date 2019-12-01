/**
 * Create a MySQL connection and provide the resulting pool as the module's
 * output.
 */
const mysql = require('promise-mysql');
const config = require('./config.json');

const pool = mysql.createPool({
	host: config.database.host,
	port: config.database.port,
	user: config.database.user,
	password: config.database.password,
	database: config.database.dbName,
});

// Close the pool whenever the application is exiting, just to keep the Node.js
// process from remaining in the background until the SQL server kills the
// connection.
process.on('exit', () => {
	pool.end();
});

module.exports = pool;
