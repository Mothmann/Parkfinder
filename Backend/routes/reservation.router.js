const express = require('express');
const reservationController = require('../controllers/reservation.controller');
const router = express.Router();

router.post('/', reservationController.addReservation);
router.get('/', reservationController.listReservations);
router.get('/user/:_id', reservationController.listUserReservations);
router.get('/date/:_id', reservationController.filterByDate);
router.get('/parking/:_id', reservationController.filterByParking);
router.put('/annuler/:_id', reservationController.annulerReservation);

module.exports = router;