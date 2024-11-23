const postController = require('../controllers/postController');
const { authenticateToken, verifyAdmin } = require('../middleware/authMiddleware');
const express = require('express');
const { upload } = require('../services/file-uploader/multer');

const router = express.Router();

router.get('/getFeedPosts', authenticateToken, postController.getFeedPosts);
router.get('/getPost/:id', authenticateToken, postController.getPost);
router.get('/getUserPosts/:userId', authenticateToken, postController.getUserPosts);
router.get('/getMyPosts', authenticateToken, postController.getMyPosts);

router.post('/uploadPost', authenticateToken, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'docs', maxCount: 2 }, { name: 'video', maxCount: 1 }]), postController.uploadPost);
router.patch('/editPost', authenticateToken, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'docs', maxCount: 2 }, { name: 'video', maxCount: 1 }]), postController.editPost);
router.delete('/deletePost', authenticateToken, postController.deletePost);

router.patch('/likePost', authenticateToken, postController.likePost);

router.post('/addComment', authenticateToken, postController.addComment);
router.post('/replyComment', authenticateToken, postController.replyComment);
router.patch('/likeComment', authenticateToken, postController.likeComment);
router.patch('/likeReply', authenticateToken, postController.likeReply);


// ADMIN POST ROUTES
router.get('/getAllPosts', authenticateToken, verifyAdmin, postController.getAllPosts);
router.patch('/changeStatus', authenticateToken, verifyAdmin, postController.changePostStatus);
router.get('/postStatistics', authenticateToken, verifyAdmin, postController.getMonthlyPostCounts);

module.exports = router;