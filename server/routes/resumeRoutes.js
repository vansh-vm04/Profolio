const express = require('express')
const router = express.Router();
const {viewResume, downloadResume, openResume} = require('../controllers/resumeController');
const {jwtAuthMiddleware} = require('../middlewares/authMiddleware')


router.post('/download',jwtAuthMiddleware,downloadResume);
router.post('/view',viewResume);
router.post('/open',openResume);

module.exports = router;