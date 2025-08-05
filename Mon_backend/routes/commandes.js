// routes/commandes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agd_db'
});

router.post('/commandes', (req, res) => {
  const { nomClient, panier } = req.body;

  // Validation basique
  if (!nomClient || !Array.isArray(panier) || panier.length === 0) {
    return res.status(400).json({ message: 'Données invalides' });
  }

  // Insérer la commande
  const insertCommandeQuery = `INSERT INTO commandes (nom_client, date_commande) VALUES (?, NOW())`;

  db.query(insertCommandeQuery, [nomClient], (err, result) => {
    if (err) {
      console.error('Erreur insertion commande:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    const commandeId = result.insertId;

    // Insérer les produits du panier
    const insertProduitQuery = `
      INSERT INTO commande_produits (commande_id, nom_produit, quantite, prix_unitaire)
      VALUES ?
    `;

    const produitsData = panier.map(p => [commandeId, p.name, p.quantity, p.price]);

    db.query(insertProduitQuery, [produitsData], (err2) => {
      if (err2) {
        console.error('Erreur insertion produits:', err2);
        return res.status(500).json({ message: 'Erreur lors de l\'insertion des produits' });
      }

      res.json({ message: 'Commande enregistrée avec succès', commandeId });
    });
  });
});

module.exports = router;
