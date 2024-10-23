const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mariadb = require('mariadb');
const { ping_db, connect_to_db } = require("./public/scripts/connect.js");
const dotenv = require("dotenv");

ping_db();
dotenv.config();

const app = express();
app.use(express.static('public'));

app.use(express.json());

// Définir le chemin du répertoire public
const publicPath = path.join(__dirname, 'public');

// Définition des routes

const emailjsUserId = process.env.PUBLIC_KEY;
const emailjsServiceId = process.env.SERVICE_ID;
const emailjsTemplateId = process.env.TEMPLATE_ID;

app.get('/emailjs-config', (req, res) => {
  res.json({
      public_key: emailjsUserId,
      serviceId: emailjsServiceId,
      templateId: emailjsTemplateId
  });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/accueil.html'));
});
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/accueil.html'));
});
app.get('/ressource', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/ressource.html'));
});
app.get('/depot', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/depot.html'));
})
app.get('/events', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/events.html'));
});
app.get('/charte', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/charte.html'));
});
app.get('/add_admin', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/add_admin.html'));
});

// Pour compter le nombre de validation de la charte
app.get('/utilisateurs/bouton-clique', async (req, res) => {
  try {
    const Connection = await connect_to_db();
    const count = await Connection.countDocuments({ buttonClicked: true });
    res.json({ count });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre d\'utilisateurs ayant cliqué sur le bouton :', error);
  }
});

// Écouter le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur est en cours d\'écoute sur le port 3000...');
});
