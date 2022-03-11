const express = require('express');
const parkingController = require('../controllers/parking.controller');
const router = express.Router();

router.post('/', parkingController.addParking);
router.get('/', parkingController.listParkings);
router.put('/:_id', parkingController.updateParking);
router.delete('/:_id', parkingController.deleteParking);

module.exports = router;