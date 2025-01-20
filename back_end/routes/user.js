const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/updateUserbyId/:id', userController.updateUser);
router.delete('/deleteUserById/:id', userController.deleteUser);

module.exports = router;
