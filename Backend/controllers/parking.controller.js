const Parking = require('../models/parking.model');

function addParking(req,res){
    var newParking = new Parking({
        Name: req.body.Name,
        address: req.body.address,
        GeoLocation: req.body.GeoLocation,
        Total_Vehicles: req.body.Total_Vehicles,
        Vehicle_Capacity: req.body.Vehicle_Capacity,
        Reservation_Price: req.body.Reservation_Price,
    }).save();
    res.send("Parking added successfully");
};

function listParkings(req, res){
    Parking.find({}, function (err, parking) {
        res.send(parking);
    });
};

function updateParking(req, res){
    Parking.findById(req.params._id, function (err, parking) {
        if (err) return res.status(500).send(err);
        if (!parking) return res.status(404).send('Parking Not Found');

        parking.Name = req.body.Name || parking.Name;
        parking.address = req.body.address || parking.address;
        parking.Description = req.body.Description || parking.Description;
        parking.GeoLocation = req.body.GeoLocation || parking.GeoLocation;
        parking.Photo = req.body.Photo || parking.Photo;
        parking.Total_Vehicles = req.body.Total_Vehicles || parking.Total_Vehicles;
        parking.Vehicle_Capacity = req.body.Vehicle_Capacity || parking.Vehicle_Capacity;
        parking.Reservation_Price = req.body.Reservation_Price || parking.Reservation_Price;

        parking.save(function (err, parking) {
            if (err) return res.status(500).send(err);
            res.status(200).json(parking);
        });
    });
};

function deleteParking(req, res) {
    Parking.findById(req.params._id, function (err, parking) {
        if (err) return res.status(500).send(err);
        if (!parking) return res.status(404).send('Parking Not Found');
        parking.remove({ _id: req.body._id }, function (err) {
            if (!err) {
                message.type = 'notification!';
            }
            else {
                message.type = 'error';
            }
        });
    });
};

module.exports = {
    addParking: addParking,
    listParkings: listParkings,
    updateParking: updateParking,
    deleteParking: deleteParking,
};