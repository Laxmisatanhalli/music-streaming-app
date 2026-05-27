const express = require('express');
const musicController = require('../controllers/music.controller');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');

const upload =multer({
  storage: multer.memoryStorage()
}) ;


const router = express.Router();

router.post('/upload',authMiddleware.authArtist ,upload.single('music'), musicController.addMusic);

router.post('/album', authMiddleware.authArtist , musicController.createAlbum);

router.get("/",authMiddleware.authUser , musicController.getAllMusics)

module.exports = router;