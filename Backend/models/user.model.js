const { model } = require('mongoose')

const User = model('User', {

    Email:{
        type: String,
        required: true, 
        unique: true,
     },

    Name:{
        type: String,
        required: true,
    },

    confirmationCode: { 
        type: String, 
        unique: true },
        
    Password:{
        type: String,
        required: true,
    },

    Email_verified:{
        type: Boolean,
        required: true,
        default: false,
    },

    Account_balance:{
        type: Number,
        default: 0,
    },

    Banned:{
        type: Boolean,
        required: true,
        default: false,
    },
     cards: [
         {
             type: {
                 type: String
             },
             number: {
                 type: Number
             },
             name: {
                 type: String
             },
             expiry: {
                 type: Number
             },
             cvc: {
                 type: Number
             },
         }
     ]

});

module.exports = User;