const express = require('express');
const { birdController } = require('../controllers');
const { authenticateToken, authenticateTokenAdmin } = require('../middleware/jwt');

const router = express.Router();


router.get('/getAllBirds', authenticateToken, birdController.getAllBirds);
router.get("/getBirdsWithAvailableBuyState", authenticateToken, birdController.getBirdsWithAvailableBuyState);
router.get("/getBirdsWithPendingBuyState", authenticateToken, birdController.getBirdsWithPendingBuyState);
router.get('/getBirdById/:id', authenticateToken, birdController.getBirdById);
router.post('/createBird', authenticateTokenAdmin, birdController.createBird);
router.post('/generateDummyBirds', authenticateTokenAdmin, birdController.generateDummyBirds);
router.put('/updateBirdById/:id', authenticateTokenAdmin, birdController.updateBirdById);
router.put('/updateBirdBuyStateById/:id', authenticateToken, birdController.updateBirdBuyStateById)
router.delete('/deleteBirdById/:id', authenticateTokenAdmin, birdController.deleteBirdById);
router.delete('/deleteAllBirds', authenticateTokenAdmin, birdController.deleteAllBirds);

module.exports = router;
