const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config(); // If you store credentials in .env

// Set up the transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.univ-rennes2.fr',
  port: 465,
  secure: true,
  auth: {
    user: process.env.UNIV_EMAIL,
    pass: process.env.UNIV_EMAIL_PASS,
  },
});

async function sendMail(formData) {
  try {
    const text = `Vous avez reçu une nouvelle demande d'ajout de ressource de ${formData.fname} ${formData.lname}.

        Mr/Mme ${formData.lname} ${formData.right},
        La ressource se trouve sur ${formData.room || 'la carte'}
        Le lien vers la ressource est: | ${formData.link} |
        La ressource est en ${formData.language} niveau ${formData.level}
        Le point de langue est ${formData.languagePoint} sur le sujet ${formData.subjectField}.
        Vous pouvez contacter Mr/Mme ${formData.lname} à l'adresse mail ${formData.email}.
        `;
    console.log(text);
    const info = await transporter.sendMail({
      from: formData.email,
      to: "espace-des-langues@univ-rennes2.fr",
      subject: "Ajout de ressource dans la base de donnée",
      text: text,
    });
    console.log('Message id: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendMail;
