const Reservation = require('../models/reservation.model');
const User = require('../models/user.model')


function updatebalance( req , res , id , price) {
     User.findById(id, function (err, user) {
        if (err) return res.status(500).send(err);

        user.Account_balance = user.Account_balance - price;

        user.save(function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).json("finished");
        });
    });
}
function ScanneCode(req, res) {

 
    Reservation.findById(req.params._id , {}).populate('Parking_id')
        .exec((err, reservation) => {
        if (err)  return res.status(500).send(err);
            if (reservation) {
                if (reservation.started == false) {
                    start(req, res)
                }
                if (reservation.started == true && reservation.finished == false) {

                    finish(req, res , reservation.Parking_id.Parking_Price , reservation.User_id )
                    
                }
                if (reservation.started == true && reservation.finished == true) {

                    
                    res.status(200).json("Parking already finished");
                }
            }
        else return res.status(500).send("no result found");
    })
};

function start(req, res) {
     Reservation.findById(req.params._id, function (err, r) {
        if (err) return res.status(500).send(err);     
        r.started = true,
        r.startTime = Date.now()
         

        r.save(function (err, r) {
            if (err) return res.status(500).send(err);
            res.status(200).json("started");
    })
    });
}

function finish(req, res , price , user) {
    
    Reservation.findById(req.params._id, function (err, r) {
        if (err) return res.status(500).send(err);
     
        r.finished = true,
        r.endTime = Date.now()
        diff = new Date(r.endTime).getTime() - new Date(r.startTime).getTime()
        min = Math.floor(diff / 1000 % 60)
        r.Reservation_Price = min * price
        r.save(function (err, r) {
            if (err) return res.status(500).send(err);
            updatebalance(req , res , user ,r.Reservation_Price )
        });
    })

}




module.exports = {
    ScanneCode: ScanneCode,
    start: start,
    finish: finish
};



