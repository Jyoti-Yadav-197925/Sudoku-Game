const express = require('express');
const { handleGenerateNewShortUrl, handleAnalytics } = require('../controllers/urlController');

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleAnalytics);
module.exports = router;
