const { Router } = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');

const router = Router();

router.get('/getUserNotifications', authenticateToken, notificationController.getUserNotifications);
router.patch('/changeNotificationStatus', authenticateToken, notificationController.changeNotificationStatus);


module.exports = router;