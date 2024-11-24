const express = require('express');
const carbonEmissionController = require('../controllers/carbonEmissionController');
const { authenticateToken, verifyAdmin } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/postCarbonEmission', authenticateToken, carbonEmissionController.postCarbonEmission);
router.get('/getCarbonEmission', authenticateToken, carbonEmissionController.getCarbonEmission);

module.exports = router;