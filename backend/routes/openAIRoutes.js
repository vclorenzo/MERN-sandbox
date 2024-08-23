const express = require('express');
const router = express.Router();
const { generateText } = require('../controllers/openAIController');

router.post('/text', generateText);

module.exports = router;
