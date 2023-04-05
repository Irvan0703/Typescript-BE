import express from "express";
import { sequelize } from "../../database/db";
const router = express.Router();

router.get('/products', async (req, res) => {
  const users = await sequelize.query('SELECT * FROM products');
  res.json(users);
})

module.exports = router;