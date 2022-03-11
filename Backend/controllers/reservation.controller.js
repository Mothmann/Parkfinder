const QRCode =  require("qrcode");
const Reservation = require('../models/reservation.model');
const nodemailer = require('../configs/nodemailer.config');
const User = require("../models/user.model");
const Parking = require("../models/parking.model")
function addReservation(req, res) {
    var newReservation = new Reservation({
        User_id: req.body.User_id,
        Parking_id: req.body.Parking_id,
        arrivalTime: req.body.arrivalTime,
        parkingSlot: req.body.parkingSlot,
        carNumber: req.body.carNumber,
    }).save((err, result) => {
        if (result) {
            const generateQR = async text => {
                try {
                    await QRCode.toFile('./configs/qrcode.png', text);
                } catch(err){
                    console.log(err);
                }
            }
            generateQR(JSON.stringify(result._id));
             User.findById(req.body.User_id, function (err, user) {
                 if (user) {
                      nodemailer.sendQRcode(
                          user.Name,
                          user.Email, 
                     );
                  }
                  else res.status(500).send(err);
              });
            

            Parking.findById({ _id: req.body.Parking_id }).exec((err, p) => {
                if (p) {
                    result.Parking_id = p
                    res.status(200).json({ message: "Reservation added successfully", reservation: result })
                }
                else res.status(500).send(err);
            })

        }
        else res.status(500).send(err);
    });

};

function listReservations(req, res) {
    Reservation.find({}, function (err, reservation) {
        res.status(200).json(reservation);
    });
};


function listUserReservations(req, res) {

    Reservation.find({ User_id: req.params._id }, {}).populate('Parking_id')
        .exec((err, reservation) => {
            if (reservation) { res.status(200).json(reservation); console.log(reservation) }
            else {
                console.log(err);
                res.status(500).send(err);
            }
        });
};

function filterByDate(req, res) {
    Reservation.find({ Parking_Date: req.params.Parking_Date }, (err, reservation) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).json(reservation);
        }
    });
};

function filterByParking(req, res) {
    Reservation.find({ Parking_Name: req.params.Parking_Name }, (err, reservation) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).json(reservation);
        }
    });
};

function annulerReservation(req, res){
    Reservation.findOneAndUpdate(
        {_id: req.params._id},
        {finished: true}).exec((error, result) => {
            if (result) {
                res.send("Reservation Cancelled");
            }
            else {
                res.status(500).send('something went wrong')
            }
        })
}


module.exports = {
    addReservation: addReservation,
    listReservations: listReservations,
    filterByDate: filterByDate,
    filterByParking: filterByParking,
    listUserReservations: listUserReservations,
    annulerReservation: annulerReservation,
}; 