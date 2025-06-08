const express = require('express')
const router = express.Router();
const {uploadImage} = require('../controllers/uploadController')
const upload = require('../middlewares/multerMiddleware')

router.post('/upload',upload.single('image'),uploadImage);

module.exports = router;