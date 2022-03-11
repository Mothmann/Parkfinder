const { Schema, model } = require('mongoose')


const Reservation = model('Reservation', {

    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Parking_id: {
        type: Schema.Types.ObjectId,
        ref: 'Parking',
        required: true,
    },

    Reservation_Date: {
        type: Date,
        required: true,
        default: Date.now,
    },

    Reservation_Price: {
        type: Number,
        default: 0
    },
    parkingSlot: {
        type: String,
        Required: true
    },
    carNumber: {
        type: String,
        Required: true
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    started: {
        type: Boolean,
        default: false,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },

});

module.exports = Reservation;