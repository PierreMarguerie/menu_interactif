const { connect_to_db } = require('./connect.js');

async function deleteById(id) {
    const conn = await connect_to_db();
    if (!conn)
        return 84;
    try {
        console.log("ID: " + id);
        const resp = await conn.query('DELETE FROM resources WHERE resources.id = ?', [id]);
        console.log("response: ", resp);
        return resp;
    } catch (err) {
        console.log(err);
        return 84;
    } finally {
        conn.end();
    }
}

module.exports = { deleteById };