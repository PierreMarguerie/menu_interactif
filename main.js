const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mariadb = require('mariadb');
const { ping_db } = require("./scripts/connect.js");

ping_db();



const app = express();

// Écouter le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en cours d\'écoute sur le port 3000...');
});
