const express = require('express');
const { userController } = require('../controllers');
const { authenticateToken, authenticateTokenAdmin } = require('../middleware/jwt');

const router = express.Router();

router.get('/getAllUsers', authenticateTokenAdmin, userController.getAllUsers);
router.get('/getUserById/:id', authenticateToken, userController.getUserById);
router.get('/getFavouriteBirds/:id', authenticateToken, userController.getFavouriteBirds);
router.post('/addBirdToFavourites', authenticateToken,userController.addBirdToFavourites);
router.post('/verifyBirdIsFavourite', authenticateToken,userController.verifyBirdIsFavourite);
router.post('/loginUser', userController.loginUser);
router.get('/logoutUser', userController.logoutUser);
router.post('/createUser', userController.createUser);
router.put('/updateUserById/:id', authenticateTokenAdmin, userController.updateUserById);
router.put('/reserveBirdForUser', userController.reserveBirdForUser);
router.put('/boughtBirdForUser', userController.boughtBirdForUser);
router.put('/rejectBirdForUser', userController.rejectBirdForUser);
router.delete('/deleteUserById/:id', authenticateTokenAdmin, userController.deleteUser);
router.get('/checkAdminStatus/:id', authenticateToken, userController.checkAdminStatus);

module.exports = router;
