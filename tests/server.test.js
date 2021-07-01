/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app');
const schema = require('../db/schema');
const testDB = require('./testDB');

const port = 4001;

describe('test API endpoints', () => {
  let db;
  let server;
  let agent;

  const clearDB = async (connection, tablenames) => {
    await Promise.all(tablenames.map(async (table) => {
      await connection.query(`DROP TABLE IF EXISTS ${table}`);
    }));
  };

  const resetDB = async () => {
    const tablenames = ['products, features, styles, photos, skus, related, cart'];

    await clearDB(db, tablenames);
    await schema(db);
  };

  beforeAll(async () => {
    db = testDB;
    server = await app.listen(port);
    agent = request.agent(server);
  });

  beforeEach(async () => {
    await resetDB();
  });

  afterAll(async () => {
    await db.end();
    await server.close();
  });

  describe('get list of products', () => {
    test('default to page 1 and count 5 if no args passed', async () => {
      const res = await agent.get('/api/products/list');

      const firstObj = res.body[0];
      const lastObj = res.body[4];

      expect(res.body.length).toBe(5);
      expect(firstObj.id).toBe(1);
      expect(lastObj.id).toBe(5);
    });

    test('return correct page results when page and count args are passed', async () => {
      const res = await agent.get('/api/products/list/2/5');

      const firstObj = res.body[0];
      const lastObj = res.body[4];

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(firstObj.id).toBe(6);
      expect(lastObj.id).toBe(10);
    });

    test('return empty array when invalid page or count', async () => {
      const res = await agent.get('/api/products/list/3/5');

      expect(res.body.length).toBe(0);
    });
  });

  describe('get a specific product', () => {
    test('return a product\'s data from id', async () => {
      const res = await agent.get('/api/products/10');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(10);
    });
  });

  describe('get a specific product\'s styles', () => {
    test('return a product\'s styles data from id', async () => {
      const text = 'INSERT INTO styles(product_id, name, sale_price, original_price, default_style) VALUES($1, $2, $3, $4, $5)';
      const values1 = [1, 'Forest Green & Black', null, 140.00, true];
      const values2 = [1, 'Desert Brown & Tan', null, 140.00, false];

      await db.query(text, values1);
      await db.query(text, values2);

      const res = await agent.get('/api/products/1/styles');

      expect(res.status).toBe(200);
      expect(res.body.product_id).toBe('1');
      expect(res.body.results.length).toBe(2);
    });
  });

  describe('get a specific product\'s related items', () => {
    test('return a product\'s related data from id', async () => {
      const text = 'INSERT INTO related(current_product_id, related_product_id) VALUES($1, $2)';
      const values1 = [1, 2];
      const values2 = [1, 3];
      const values3 = [1, 8];
      const values4 = [1, 7];

      await db.query(text, values1);
      await db.query(text, values2);
      await db.query(text, values3);
      await db.query(text, values4);

      const res = await agent.get('/api/products/1/related');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(4);
      expect(res.body).toContain(2, 3, 8, 7);
    });
  });
});
