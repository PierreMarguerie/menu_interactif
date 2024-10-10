const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mariadb = require('mariadb');
const { ping_db } = require("./public/scripts/connect.js");

ping_db();



const app = express();
app.use(express.static('public'));

app.use(express.json());

// Définir le chemin du répertoire public
const publicPath = path.join(__dirname, 'public');

// Définition des routes
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/accueil.html'));
});
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/accueil.html'));
});
app.get('/ressource', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/ressource.html'));
});

// Écouter le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en cours d\'écoute sur le port 3000...');
});
