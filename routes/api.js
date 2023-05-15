const express = require('express');
const router = express.Router();
const db = require('../service/firebase');

router.post('/getAllData', (req, res, next) => {
    let { collection } = req.body;
    if(!collection) {
        console.error('collection is undefined.');
        return;
    }

    return db.getAllData(collection)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.post('/getArtice', (req, res, next) => {
    let body = req.body;
    if(!body.collection) {
        console.error('collection is undefined.');
        return;
    }

    return db.getArtice(body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

// router.post('/getAllImage', (req, res, next) => {
//     let { collection } = req.body;
//     if(!collection) {
//         console.error('collection is undefined.');
//         return;
//     }

//     return db.getAllArtice(collection)
//     .then(response => {
//         res.status(200).send(response);
//     })
//     .catch(error => {
//         res.status(500).send(error);
//     });
// });

module.exports = router;