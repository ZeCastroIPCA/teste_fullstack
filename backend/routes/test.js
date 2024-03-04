const express = require('express');
const router = express.Router();
const { get200Everytime, count, order, returnData } = require('../controllers/test');

// GET
// Get 200 status code for all requests
router.get('/200', get200Everytime);
// Get data from API link and return it
router.get('/data', returnData);

// POST
// count the number of elements of a JSON array
router.post('/count', count);
// Order array items by quantity, payment condition and country
router.post('/order', order);

module.exports = router;