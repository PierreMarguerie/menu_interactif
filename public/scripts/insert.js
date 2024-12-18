const { connect_to_db } = require('./connect.js');
const fs = require('fs').promises; // For file handling if needed

async function insertResource({ name, link, area, map, tags, imageFile }) {
    const conn = await connect_to_db();
    if (!conn) return;
    try {
        const imageData = await fs.readFile(imageFile.path);
        const query = `INSERT INTO resources (name, link, tags, map, area, image_data) VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await conn.query(query, [
            name,
            link,
            tags,
            map,
            area,
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
