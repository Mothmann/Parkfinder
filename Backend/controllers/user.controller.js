const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
var validator = require("validator");
const jwt = require('jsonwebtoken');
const nodemailer = require('../configs/nodemailer.config');
const config = require("../configs/auth.config");
const { useResource } = require('admin-bro');

function signup(req, res) {
    User.findOne(
        { 'Email': req.body.Email }
    ).then(result => {
        if (result) {


            res.send("email already exists");
        }
        if (!validator.isEmail(req.body.Email)) {
            res.send("this is not an email");
        }
        if (!validator.isLength(req.body.Password, { min: 8, max: 20 })) {
            res.send("password must be between 8 and 20 characters");

        }
        else {
            bcryptjs.genSalt(10, function (error, salt) {
                bcryptjs.hash(req.body.Password, salt, async function (error, hash) {
                    const token = jwt.sign({ Email: req.body.Email }, config.secret)
                    var newUser = new User({
                        Email: req.body.Email,
                        Name: req.body.Name,
                        confirmationCode: token,
                        Password: hash,
                    }).save()
                    res.send({
                        message:
                            "Please check your email to verify your account",
                    });

                    nodemailer.sendConfirmationEmail(
                        req.body.Name,
                        req.body.Email,
                        token
                    );
                });
            })
        }

    }).catch(error => {
        res.status(500).json({
            message: 'something went wrong'
        });
    });
}

function signin(req, res) {
    User.findOne(
        { 'Email': req.body.Email }).then(User => {
            if (User === null) {
                res.status(401).json({
                    message: 'Wrong username or password',
                });
            }


            bcryptjs.compare(req.body.Password, User.Password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        Email: User.Email,
                    }, 'x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r', function (err, token) {
                        session = req.session;
                        session.userid = User._id
                        res.status(200).json({
                            message: 'Authentication successful',
                            token: token,
                            user: {
                                id: User._id,
                                banned: User.Banned,
                                emai_verified: User.Email_verified,
                            }
                        });
                    });
                } else {
                    res.status(200).json({
                        message: 'wrong username or password',


                    });
                }
            });
        }
        ).catch(error => {
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
};

function getuserInfo(req, res) {
    User.findById(req.params._id).exec((error, result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.status(500).send('something went wrong')
        }
    })
};
function logout(req, res) {
    req.session.destroy();
    res.send("logout")
};

function Ban(req, res) {
    User.findOneAndUpdate(
        { _id: req.params._id },
        { Banned: true }).exec((error, result) => {
            if (result) {
                res.send("User blocked successfully");
            }
            else {
                res.status(500).send('Something went wrong')
            }
        })
};

function unBan(req, res) {
    User.findOneAndUpdate(
        { _id: req.params._id },
        { Banned: false }).exec((error, result) => {
            if (result) {
                res.send("User unblocked successfully");
            }
            else {
                res.status(500).send('Something went wrong')
            }
        })
};

function listUsers(req, res) {
    User.find({}, (err, User) => {
        res.send(User);
    });
};

/*function Admin(req, res) {
    User.findOneAndUpdate(
        { _id: req.params._id },
        { Admin: true }).exec((error, result) => {
            if (result) {
                res.send("User is now an admin");
            }
            else {
                res.status(500).send('something went wrong')
            }
        })
};*/

/*function RevokeAdmin(req, res) {
    User.findOneAndUpdate(
        { _id: req.params._id },
        { Admin: false }).exec((error, result) => {
            if (result) {
                res.send("Revoked admin role");
            }
            else {
                res.status(500).send('something went wrong')
            }
        })
};*/

function updateUser(req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err) return res.status(500).send(err);

        user.Email = req.body.Email || user.Email;
        user.Name = req.body.Name || user.Name;
        user.Password = req.body.Password || user.Password;

        if (!req.body.Email == user.Email) {
            user.Email_verified = false;
        }

        user.save(function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).json(user);
        });
    });
};

function updateUserBalance(req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err) return res.status(500).send(err);

        user.Account_balance = req.body.m + user.Account_balance;

        user.save(function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).json(user);
        });
    });
};
function verifyUser(req, res) {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((User) => {
            if (!User) {
                return res.status(404).send({ message: "User Not found." });
            }
            User.Email_verified = true;
            User.save((err) => {
              if (err) {
                  res.status(500).send({ message: err });
                  return;
              }
              })
        })
}
function resendEmail(req, res) {

    User.findById(
        { _id: req.params._id }).exec((error, result) => {
            if (result) {
                nodemailer.sendConfirmationEmail(
                    result.Name,
                    result.Email,
                    result.confirmationCode
                );
                res.send('email sent');
            }
            else {
                res.status(500).send('something went wrong')
            }
        })
}
module.exports = {
    signup: signup,
    signin: signin,
    Ban: Ban,
    unBan: unBan,
    //Admin: Admin,
    //RevokeAdmin: RevokeAdmin,
    listUsers: listUsers,
    updateUser: updateUser,
    updateUserBalance: updateUserBalance,
    getuserInfo: getuserInfo,
    logout: logout,
    verifyUser: verifyUser,
    resendEmail: resendEmail,
};