const db = require('../db/index');

const controller = {
  getProducts: async (req, res) => {
    const page = req.params.page || 1;
    const count = req.params.count || 5;

    try {
      const text = 'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2';
      const values = [count, (page - 1) * count];
      const data = await db.query(text, values);

      res.status(200).json(data.rows);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  getProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const text = 'SELECT * FROM products WHERE id=$1';
      const values = [id];
      const productData = await db.query(text, values);

      const text2 = 'SELECT feature, value FROM features WHERE product_id=$1';
      const featuresData = await db.query(text2, values);

      productData.rows[0].features = featuresData.rows;

      res.status(200).json(productData.rows[0]);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  getStyles: async (req, res) => {
    const { id } = req.params;

    try {
      const styleObj = {};
      styleObj.product_id = `${id}`;

      const text = 'SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?", (SELECT array_to_json(array_agg(row_to_json(x))) FROM (SELECT thumbnail_url, url FROM photos WHERE style_id=styles.id) x) AS photos, (SELECT json_object_agg(skus.id, json_build_object(\'quantity\', skus.quantity, \'size\', skus.size)) FROM skus WHERE style_id=styles.id ) AS skus FROM styles WHERE product_id=$1';

      const values = [id];

      const styleData = await db.query(text, values);

      styleObj.results = styleData.rows;

      res.status(200).json(styleObj);
    } catch (err) {
      res.status(404).send(err);
    }
  },

  getRelated: async (req, res) => {
    const { id } = req.params;

    try {
      const text = 'SELECT array_agg(related_product_id) FROM related WHERE current_product_id=$1';

      const values = [id];

      const data = await db.query(text, values);

      res.status(200).json(data.rows[0].array_agg);
    } catch (err) {
      res.status(404).send(err);
    }
  },
};

module.exports = controller;
