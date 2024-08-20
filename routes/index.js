const express = require('express');
const router = express.Router();

router.use('/notes', require('./notes.route'))
router.use('/timers', require('./timers.route'))
module.exports = router;