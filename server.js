const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mariadb = require('mariadb');
const { ping_db, connect_to_db } = require("./public/scripts/connect.js");
const { insertResource } = require("./public/scripts/insert.js");
const { getByLink } = require("./public/scripts/getResourceByLink.js");
const { getResourceByNames} = require("./public/scripts/getResourceByNames.js")
const { deleteById } = require("./public/scripts/deleteById.js");
const dotenv = require("dotenv");
const multer = require('multer');
const sendMail = require('./public/scripts/sendMail.js');

ping_db('menu');
dotenv.config();

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images/'); // Specify folder to store uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Make file names unique
  }
});
const upload = multer({ storage: storage });

const fs = require('fs');
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}
app.use('/images', express.static('images'));

// Définir le chemin du répertoire public
const publicPath = path.join(__dirname, 'public');

// Définition des routes

app.post('/insert', upload.single('image'), async (req, res) => { // Insertion d'une ressource dans la BDD
  const { resourceName, link, areaName, room, tags } = req.body;
  const imageFile = req.file; // This is the file object uploaded by the user

  if (!resourceName || !link || !areaName || !room || !imageFile || !tags) {
      return res.status(400).send('All fields are required.');
  }
  try {
      await insertResource({
          name: resourceName,
          link: link,
          area: areaName,
          map: room,
          tags: tags,
          imageFile: imageFile
      });
      res.status(200).send('Resource inserted successfully!');
  } catch (err) {
      console.error('Error inserting resource:', err);
      res.status(500).send('Internal server error');
  }
});

app.post('/getByLink', async (req, res) => { // Recherche d'une ressource dans la BDD par lien
  const { link } = req.body;
  console.log("BODY: ", link);
  try {
      const resource = await getByLink(link);

      if (!resource) {
        return res.status(404).send('Resource not found.');
      }

      console.log("Retour de fonction", resource);
      resource.image_data = resource.image_data.toString('base64');
      res.json(resource);
  } catch (err) {
      console.error('Error searching resource:', err);
      res.status(500).send('Internal server error');
  }
});

app.post('/getByNames', async (req, res) => {
  const {mapName, name} = req.body;
  console.log("BODY: ", mapName, name);
  try {
    const resource = await getResourceByNames(mapName, name);

    if (!resource) {
      return res.status(404).send('Resource not found.');
    }

    console.log("Retour de fonction", resource);
    resource.image_data = resource.image_data.toString('base64');
    res.json(resource);
  } catch (err) {
      console.error('Error searching resource:', err);
      res.status(500).send('Internal server error');
  }
});

app.post('/deleteById', async (req, res) => { // Suppression d'une ressource dans la BDD par id
  const { id } = req.body;
  console.log("BODY: ", id);
  try {
    const reponse = await deleteById(id);
    if (reponse != 84)
      res.status(200).send("Ressource supprimée avec succès.");
  } catch (err) {
    console.error('Error deleting resource:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/send-email', async (req, res) => {
  const formData  = req.body.formData;
  try {
    await sendMail(formData);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
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
app.get('/interne', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/interne.html'));
});
app.get('/exterieur', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/exterieur.html'));
});
app.get('/observateur', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/observateur.html'));
});
app.get('/enseignant', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/enseignant.html'));
});
app.get('/add_admin', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/add_admin.html'));
});
app.get('/del_admin', (req, res) => {
  res.sendFile(path.join(publicPath, '/index/remove.html'));
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
