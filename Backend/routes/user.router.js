const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/sign-up', userController.signup);
router.post('/sign-in', userController.signin);
router.get('/info/:_id',userController.getuserInfo)
router.get('/logout',userController.logout)
router.put('/ban/:_id', userController.Ban);
router.put('/unban/:_id', userController.unBan);
router.put('/info/:_id', userController.updateUser);
router.put('/balance/:_id', userController.updateUserBalance);
router.get('/list', userController.listUsers);
router.get('/confirm/:confirmationCode', userController.verifyUser);
router.get('/reconfirm/:_id', userController.resendEmail);

 module.exports = router;