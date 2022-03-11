const { model } = require('mongoose')

const Parking = model('Parking', {

    Name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: false,
    },

    GeoLocation: {
        type: [Number, Number],
        Required: true,
   },

   Photo: {
       type: String,
       required: false,
   },

   Total_Vehicles:{
       type: Number,
       required: true,
   },

   Vehicle_Capacity:{
       type: Number,
       required: true,
   },

   Parking_Price:{
       type:Number,
       required:true,
   },

});

module.exports = Parking;