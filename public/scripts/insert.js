const { connect_to_db } = require('./connect.js');
const fs = require('fs').promises; // For file handling if needed

async function insertResource({ name, link, areaName, room, tags, imageFile }) {
    const conn = await connect_to_db();
    if (!conn) return;
    try {
        const imageData = await fs.readFile(imageFile.path);
        const query_wa = `INSERT INTO wa_location (room, areaName) VALUES (?, ?)`;
        const query = `INSERT INTO resources (name, link, wa_location, tags, image_data)
            VALUES (?, ?, ?, ?, ?)`;
        const result_wa = await conn.query(query_wa, [areaName, room]);
        if (result_wa.err)
            throw(err)
        const result = await conn.query(query, [
            name,
            link,
            result_wa.insertId,
            tags,
            imageData
        ]);
        console.log("Resource inserted with ID:", result.insertId);
    } catch (err) {
        console.error("Error inserting resource:", err);
    } finally {
        conn.end();
    }
}

module.exports = { insertResource };
