const express = require('express');
const { birdController } = require('../controllers');
const authenticateToken = require('../middleware/jwt');

const router = express.Router();


router.get('/getAllBirds', birdController.getAllBirds);
router.get('/getBirdById/:id', birdController.getBirdById);
router.post('/createBird', birdController.createBird);
router.post('/generateDummyBirds', birdController.generateDummyBirds);
router.put('/updateBirdById/:id', birdController.updateBirdById);
router.delete('/deleteBirdById/:id', birdController.deleteBirdById);
router.delete('/deleteAllBirds',birdController.deleteAllBirds);

module.exports = router;
