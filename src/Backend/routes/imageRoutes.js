const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// GET /api/images - Get list of all available images
router.get('/', imageController.getAllImages);

// GET /api/images/:imageName - Get a specific image
router.get('/:imageName', imageController.getImage);

module.exports = router;