import { connectToDb } from './initdb';

mariadb = require('mariadb');

async function createQuery(length) {
    let query = "SELECT * FROM resources"
        if (length > 0) {
            for (let i = 0; i < length; i++) {
                query += i == 0 ? " WHERE tags LIKE ?" : " AND LIKE ?";
            }
        }
    query += " ORDER BY id DESC";
    return query;
}

async function creat_placeholders(tags) {
    let placeholders = [];
    for (let i = 0; i < tags.length; i++) {
        placeholders.push(`%${tags[i]}%`);
    }
    return placeholders;
}

export async function getResourceByTags(tags) {
    let result = [];
    try {
        const conn = await connectToDb();
        const query = await createQuery(tags.length);
        const placeholders = creat_placeholders(tags);
        if (placeholders.length > 0) {
            const result = await conn.query(query, placeholders);
        } else {
            const result = await conn.query(query);
        }
    } catch (err) {
        console.log('Error has occured when trying to get resources by tags: ', err);
    } finally {
        if (conn) {
            conn.release();
        }
    }
    return result;
}
