const router = require('express').Router();
const controller = require('./controller');

router.get('/products/list/:page?/:count?', controller.getProducts);

router.get('/products/:id', controller.getProduct);

router.get('/products/:id/styles', controller.getStyles);

module.exports = router;
