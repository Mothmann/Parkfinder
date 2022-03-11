const nodemailer = require("nodemailer");
const config = require("../configs/auth.config");
const fs = require("fs");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
function sendConfirmationEmail(name, Email, confirmationCode){
    transport.sendMail({
      from: user,
      to: Email,
      subject: "Please confirm your account",
      html: `<div class="content">
      <img src="https://parkfinder.tk/images/parkingfinderblanc.png" alt="parkfinder-logo" width="500" height="80">
      <h2>Hello ${name},</h2>
      <p>Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:3000/user/confirm/${confirmationCode}> Click here</a>
      </div>
      <style>          
        .content {
          max-width: 500px;
          margin: auto;
          padding: 10px;
        }
        .content a{
          background-color: #F2CA00;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin-left: 20%;
        }
      </style>`,
    }).catch(err => console.log(err));
};
function sendQRcode (name, Email){
  transport.sendMail({
    from: user,
    to: Email,
    subject: "reservation qrcode",
    attachments: {
      path: __dirname + '/qrcode.png'
    },
    html: `<class="content">
    <img src="https://parkfinder.tk/images/parkingfinderblanc.png" alt="parkfinder-logo" width="500" height="80">
    <h2>Hello ${name},</h2>
    <p>you can find your ticket's qrcode in this mail</p>
    <img id="qrcode" src="qrcode.png" alt="qrcode"/>       
    </div>
    <style>          
      .content {
        max-width: 500px;
        margin: auto;
        padding: 10px;
      }
    </style>`
  }).catch((err) => {
    res.status(500).send(err)
  })              
  
} 

module.exports = {
  sendConfirmationEmail: sendConfirmationEmail,
  sendQRcode: sendQRcode,
} 