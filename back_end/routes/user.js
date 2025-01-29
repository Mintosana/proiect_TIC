const express = require('express');
const { userController } = require('../controllers');
const {authenticateToken, authenticateTokenAdmin} = require('../middleware/jwt');

const router = express.Router();

//TESTING PT JWT
router.get('/getAllUsers', authenticateTokenAdmin, userController.getAllUsers);

router.get('/getUserById/:id', userController.getUserById);
router.post('/loginUser',userController.loginUser);
router.get('/logoutUser',userController.logoutUser);
router.post('/createUser', userController.createUser);
router.put('/updateUserById/:id', userController.updateUserById);
router.put('/reserveBirdForUser', userController.reserveBirdForUser); 
router.delete('/deleteUserById/:id', userController.deleteUser);
router.get('/checkAdminStatus/:id', userController.checkAdminStatus);

module.exports = router;
