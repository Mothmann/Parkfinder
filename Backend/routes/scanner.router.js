const express = require('express');
const scannerController = require('../controllers/scanner.controllers');
const router = express.Router();

router.get('/:_id', scannerController.ScanneCode);

module.exports = router;