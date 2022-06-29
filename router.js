const express = require('express');
const router = express.Router();

const cl = require('./logic');

module.exports = router.get('/test', cl.compareLogic);