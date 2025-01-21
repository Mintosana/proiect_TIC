const express = require('express');
const { userController } = require('../controllers');
const authenticateToken = require('../middleware/jwt');

const router = express.Router();

//TESTING PT JWT
router.get('/getAllUsers', authenticateToken, userController.getAllUsers);

router.get('/getUserById/:id', userController.getUserById);
router.get('/loginUser',userController.loginUser);
router.post('/createUser', userController.createUser);
router.put('/updateUserbyId/:id', userController.updateUser);
router.delete('/deleteUserById/:id', userController.deleteUser);

module.exports = router;
