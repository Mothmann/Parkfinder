const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const User = require('../models/user.model');
const Parking = require('../models/parking.model');
const Reservation = require('../models/reservation.model');
const { Company } = require('../models/company.model');
AdminBro.registerAdapter(AdminBroMongoose);
const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('../models/actions/password.hook');

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [
    {      
      resource: User,
      options: {
        properties: {
          Password: {
            isVisible: { list: false, filter: false, show: false, edit: true },
          }
        },
        navigation:{
          icon: 'User',
          name: null,
          },
      },
      
    },
    {
      resource: Parking,
      options: {
        properties: {
          Description: {
            type: 'richtext',
          }
        },
        navigation:{
          icon: 'Location',
          name: null,
          },
      }
    },
    {
      resource: Reservation,
      options: {
        navigation:{
          icon: 'Ticket',
          name: null,
          },
      }
    },
    {
      resource: Company,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: 'password',
          },
        },
        actions: {
          new: {
            after: passwordAfterHook,
            before: passwordBeforeHook,
          },
          edit: {
            after: passwordAfterHook,
            before: passwordBeforeHook,
          },
        },
        navigation:{
          icon: 'User',
          name: null,
          },
      }
    },
  ],
  branding: {
    companyName: 'Parkfinder',
    logo: 'https://www.parkfinder.tk/images/parkfinder-contrast.png',
    softwareBrothers: false,
    favicon: "https://parkfinder.tk/images/fleche.ico",
    theme:{
      colors:{
        primary100: '#f2ca00',
        primary60: '#000',
        primary20: '#fff',
        hoverBg: '#000',
      },
      font: '\'Poppins\', sans-serif',
    }
  },
};

module.exports = options;