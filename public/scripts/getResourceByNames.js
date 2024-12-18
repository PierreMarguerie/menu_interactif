const { connect_to_db } = require("./connect.js");

async function getResourceByNames(mapName, name) {
    const conn = await connect_to_db();
    if (!conn) {
        throw new Error("Couldn't connect to DB");
    }
    try {
        const query = 'SELECT * FROM resources  WHERE map = ? AND name = ?;'
        const [rows] = await conn.query(query, [mapName, name]);
        return rows;
    } catch (err) {
        console.error("Error during getByNames: ", err);
        throw(err);
    } finally {
        conn.end();
    }
}

module.exports = { getResourceByNames };