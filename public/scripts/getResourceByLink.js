const { connect_to_db } = require('./connect.js');

mariadb = require('mariadb');

async function getByLink(link) {
    const conn = await connect_to_db();

    if (!conn) {
        throw new Error('Couldn\'t connect to DB');
    }
    try {
        const [rows] = await conn.query('SELECT * FROM resources WHERE resources.link = ?', [link]);
        return rows;
    } catch (err) {
        console.error("Error during getByLink: ", err);
        throw(err);
    } finally {
        conn.end();
    }
}

module.exports = { getByLink };
