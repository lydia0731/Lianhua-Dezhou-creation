const express = require('express');
const router = express.Router();
const db = require('../service/firebase');

router.post('/getAllData', async (req, res, next) => {
    let { collection } = req.body;
    if(!collection) {
        console.error('collection is undefined.');
        return;
    }

    let data = await db.getAllData(collection);
    
    return data;
});

module.exports = router;