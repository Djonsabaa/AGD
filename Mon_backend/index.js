const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Routes
const commandeRoutes = require('./routes/commandes');
app.use('/api', commandeRoutes);

app.listen(4000, () => {
  console.log('Serveur démarré sur http://localhost:4000');
});

// const mysql = require('mysql2');

// // Créer une connexion
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',         // ou ton utilisateur MySQL
//     password: '',         
//     database: 'agd_db'
// });

// // Connecter
// db.connect((err) => {
//     if (err) {
//         console.error('Erreur de connexion à la base de données :', err);
//     } else {
//         console.log('Connecté à la base de données MySQL');
//     }
// });


// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors()); // autorise les appels depuis ton site frontend
// app.use(express.json()); // parse les données JSON

// // Route pour enregistrer une commande
// /*app.post('/api/commande', (req, res) => {
//   const commande = req.body;
//   console.log("Commande reçue :", commande);
//   // Ici tu peux enregistrer dans un fichier, une base de données, etc.
//   res.status(200).json({ message: "Commande enregistrée avec succès !" });
// });*/

// // Route pour enregistrer une commande
// app.post('/api/commandes', (req, res) => {
//      console.log("req.body:", req.body); 
//      const { nomClient, panier } = req.body;

//   if (!nomClient || !panier || !Array.isArray(panier) || panier.length === 0) {
//     return res.status(400).json({ message: "Données invalides ou panier vide." });
//   }

//   const dateCommande = new Date();

//   let erreurs = 0;
//   let enregistrements = 0;

//   panier.forEach(item => {
//     const { name, quantity, price } = item;

//     const sql = `
//       INSERT INTO commandes (nom_client, produit, quantite, prix, date_commande)
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     db.query(sql, [nomClient, name, quantity, price, dateCommande], (err, result) => {
//       if (err) {
//         console.error("Erreur MySQL :", err);
//         erreurs++;
//       } else {
//         enregistrements++;
//       }

//       // Lorsque tous les enregistrements sont traités
//       if (enregistrements + erreurs === panier.length) {
//         if (erreurs > 0) {
//           return res.status(500).json({ message: "Une erreur est survenue lors de l'enregistrement de la commande." });
//         } else {
//           return res.status(200).json({ message: "Commande enregistrée avec succès !" });
//         }
//       }
//     });
//   });
// });

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Serveur lancé sur http://localhost:${PORT}`);
// });