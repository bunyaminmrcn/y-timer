const express = require('express');
const router = express.Router();
const knexORM = require('../conf/db-init')


router.get('/', async (req, res) => {
    const timers = await knexORM.select().from('timers')
    return res.json({ timers })
})
module.exports = router;