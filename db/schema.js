module.exports = async (db) => {
  const productText = `
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    slogan VARCHAR(255),
    description VARCHAR(1000),
    category VARCHAR(50),
    default_price DECIMAL(15,2)
  );`;

  const featuresText = `
  CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    feature VARCHAR(100),
    value VARCHAR(100)
  );`;

  const stylesText = `
  CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(100),
    sale_price DECIMAL(15,2),
    original_price DECIMAL(15,2),
    default_style BOOLEAN NOT NULL
  );`;

  const photosText = `
  CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    style_id INT NOT NULL,
    url VARCHAR(1000),
    thumbnail_url VARCHAR(1000)
  );`;

  const skusText = `
  CREATE TABLE skus (
    id SERIAL PRIMARY KEY,
    style_id INT NOT NULL,
    size VARCHAR(100),
    quantity INT
  );`;

  const relatedText = `
  CREATE TABLE related (
    id SERIAL PRIMARY KEY,
    current_product_id INT,
    related_product_id INT
  );`;

  const cartText = `
  CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_session INT NOT NULL,
    product_id INT,
    active BOOLEAN
  );`;

  // SEED PRODUCT DATA FOR TESTING
  const values1 = ['Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', 140.00];
  const values2 = ['Bright Future Sunglasses', "You've got to wear shades", "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.", 'Accessories', 69.00];
  const values3 = ['Morning Joggers', 'Make yourself a morning person', "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.", 'Pants', 40.00];
  const values4 = ["Slacker's Slacks", 'Comfortable for everything, or nothing', "I'll tell you how great they are after I nap for a bit.", 'Pants', 65.00];
  const values5 = ['Heir Force Ones', 'A sneaker dynasty', "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl", 'Kicks', 99.00];
  const values6 = ['Pumped Up Kicks', 'Faster than a just about anything', 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.', 'Kicks', 89.00];
  const values7 = ['Blues Suede Shoes', '2019 Stanley Cup Limited Edition', 'Touch down in the land of the Delta Blues in the middle of the pouring rain', 'Dress Shoes', 120.00];
  const values8 = ['YEasy 350', 'Just jumped over jumpman', 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.', 'Kicks', 450.00];
  const values9 = ['Summer Shoes', 'A risky call in the spring or fall', 'Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.', 'Kicks', 59.00];
  const values10 = ['Infinity Stone', 'Reality is often disappointing. That is, it was. Now, reality can be whatever I want.', 'The Infinity Stones are six immensely powerful stone-like objects tied to different aspects of the universe, created by the Cosmic Entities. Each of the stones possesses unique capabilities that have been enhanced and altered by various alien civilizations for millennia.', 'Accessories', 5000000.00];

  const combinedValues = [
    values1,
    values2,
    values3,
    values4,
    values5,
    values6,
    values7,
    values8,
    values9,
    values10,
  ];

  await db.query(productText);

  await Promise.all(combinedValues.map(async (vals) => {
    const queryStr = 'INSERT INTO products(name, slogan, description, category, default_price) VALUES($1, $2, $3, $4, $5)';

    await db.query(queryStr, vals);
  }));

  await db.query(featuresText);
  await db.query(stylesText);
  await db.query(photosText);
  await db.query(skusText);
  await db.query(relatedText);
  await db.query(cartText);
};
