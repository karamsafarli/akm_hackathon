const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, verifyAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../services/file-uploader/multer');


const router = express.Router();


router.post('/register', userController.register);

router.get('/getUser/:id', authenticateToken, userController.getUser);

router.get('/me', authenticateToken, userController.getMe);

router.get('/getAllUsers', authenticateToken, verifyAdmin, userController.getAllUsers);

router.post('/login', userController.login);

router.delete('/removeUser', authenticateToken, verifyAdmin, userController.removeUser);

router.post('/uploadProfilePhoto', authenticateToken, upload.single('image'), userController.uploadProfilePhoto);

router.patch('/editUser', authenticateToken, verifyAdmin, userController.editUser);

router.get('/searchUsers', authenticateToken, userController.searchUsers);

router.patch('/updateAbout', authenticateToken, userController.updateAbout);

router.patch('/updateProfileView', authenticateToken, userController.updateProfileView);

module.exports = router;
