const express = require('express');
const { birdController } = require('../controllers');
const {authenticateToken, authenticateTokenAdmin } = require('../middleware/jwt');

const router = express.Router();


router.get('/getAllBirds', authenticateToken,birdController.getAllBirds);
router.get("/getBirdsWithPendingBuyState",birdController.getBirdsWithPendingBuyState);
router.get('/getBirdById/:id', birdController.getBirdById);
router.post('/createBird', birdController.createBird);
router.post('/generateDummyBirds', birdController.generateDummyBirds);
router.put('/updateBirdById/:id', birdController.updateBirdById);
router.put('/updateBirdBuyStateById/:id', birdController.updateBirdBuyStateById)
router.delete('/deleteBirdById/:id', birdController.deleteBirdById);
router.delete('/deleteAllBirds',birdController.deleteAllBirds);

module.exports = router;
