mariadb = require('mariadb');

async function ping_db(database) {
    let conn;
    try {
        require('dotenv').config();
        // Create a new connection
        conn = await mariadb.createConnection({
            host: process.env.DB_HOST, // Adresse du serveur MariaDB
            port: process.env.DB_PORT, // Port du serveur MariaDB
            user: process.env.DB_USER, // Nom d'utilisateur
            password: process.env.DB_PASSWORD, // Mot de passe
            database: process.env.DB_NAME, // Nom de la base de données
        });
        // Print connection thread
        console.log(`Database online.`);
    } catch (err) {
        // Print error
        console.log("Error during database connection: ", err);
        console.log("Db offline");
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
