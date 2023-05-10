const express = require('express');
const router = express.Router();
const db = require('../service/firebase');

router.post('/getAllArtice', (req, res, next) => {
    let { collection } = req.body;
    if(!collection) {
        console.error('collection is undefined.');
        return;
    }

    return db.getAllArtice(collection)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;