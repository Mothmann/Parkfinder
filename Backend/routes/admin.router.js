const AdminBro = require('admin-bro');
const buildAuthenticatedRouter  = require('admin-bro-expressjs');
const express = require('express');
const argon2 = require('argon2');
const AdminBroMongoose = require('admin-bro-mongoose');
const session = require('express-session');
const User = require('../models/user.model');
const Parking = require('../models/parking.model');
const Reservation = require('../models/reservation.model');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);


const { Company } = require('../models/company.model');

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
AdminBro.registerAdapter(AdminBroMongoose);

const locale = {
  translations: {
    labels: {
      loginWelcome: 'Parkfinder Admin Panel',
    },
    messages: {
      loginWelcome: 'Hello, please login in order to manage the Parkfinder app.',
    },
  },
};

const adminBro = new AdminBro({
  rootPath: '/admin',
  locale,
  dashboard:{ component: AdminBro.bundle('../dashboardModules/Dashboard') },
});

const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter.buildAuthenticatedRouter(admin, {
    cookieName: 'admin-bro',
    cookiePassword: 'superlongandcomplicatedname',
    authenticate: async (email, password) => {
      const company = await Company.findOne({ email });
      if (company && await argon2.verify(company.encryptedPassword, password)) {
        return company.toJSON();
      }
      return null;
    },
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  });
  return router;
};

module.exports = buildAdminRouter;