const express = require('express');
const router = express.Router();
const knexORM = require('../conf/db-init')


router.get('/', async (req, res) => {
    const all = await knexORM.select().from('timers')
    return res.json(all)
})


module.exports = router;