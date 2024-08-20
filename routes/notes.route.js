const express = require('express');
const router = express.Router();
const knexORM = require('../conf/db-init')


router.get('/', async (req, res) => {
    const { notebookId } = req.query;
    let all = []
    if(notebookId) {
        all = await knexORM.where({ notebookId }).select().from('notes')
    }else {
        all = await knexORM.select().from('notes')
    }
    
    return res.json(all)
})


module.exports = router;