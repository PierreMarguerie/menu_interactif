mariadb = require('mariadb');

async function ping_db(database) {
    let conn;
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: '127.0.0.1', //adress of the mariadb server
            port: '3306', // port on wich the mariadb server is listening on
            user: 'user', // username on the mariadb server
            password: 'password', // password on the mariadb server
            database: database // database name on the mariadb server
        });
        // Print connection thread
        console.log(`Database online.`);
    } catch (err) {
        // Print error
        console.log("Error during database connection: ", err);
    } finally {
        // Close connection
        if (conn) await conn.close();
    }
}

async function connect_to_db() {
    let conn;
    try {
        conn = await mariadb.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'user',
            password: 'password',
            database: 'menu'
        });
        console.log(`Database successfully connected. (id=${conn.threadId})`);
        return conn;
    } catch (err) {
        console.log("Error during database connection: ", err);
        return null;
    }
}

module.exports = {connect_to_db, ping_db};
