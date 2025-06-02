const express = require('express')
const router = express.Router();
const { savePortfolio,openPortfolio,deletePortfolio } = require('../controllers/resumeController');

router.post('/save/:username',savePortfolio);
router.get('/open/:hash',openPortfolio);
router.delete('/delete/:username/:hash',deletePortfolio);

module.exports = router;