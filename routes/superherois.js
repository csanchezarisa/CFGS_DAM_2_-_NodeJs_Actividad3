const express = require('express');
const router = express.Router();
const Superheroi = require('../models/superherois');

router.get('/', (req, res) => {

    Superheroi.find((err, documents) => {
        if (!err) {
            res.json(documents);
        }
        else {
            res.send("Error");
        }
    });

});

router.get('/:id', (req, res) => {
    
    Superheroi.findById(req.params.id, (err, document) => {
        if (!err) {
            res.json(document);
        }
        else {
            res.send("Error");
        }
    })

});

router.get('/search/:text', (req, res) => {
    
    let filter = {
        nom: new RegExp(req.params.text, 'i')
    };

    Superheroi.find(filter, (err, documents) => {
        if (!err) {
            res.json(documents);
        }
        else {
            res.send("Error");
        }
    });

});

router.get('/sort/:prop', (req, res) => {

});

router.get('/vs/:idFirst/:idSecond', (req, res) => {

});

router.post('/', (req, res) => {

    let nouSuperheroi = new Superheroi({
        nom: req.body.nom,
        genere: req.body.genere,
        raca: req.body.raca,
        alcada: req.body.alcada,
        pes: req.body.pes,
        llocNaixement: req.body.llocNaixement,
        inteligencia: req.body.inteligencia,
        forca: req.body.forca,
        velocitat: req.body.velocitat,
        resistencia: req.body.resistencia,
        poder: req.body.poder,
        habilitat: req.body.habilitat
    });

    nouSuperheroi.save(err => {
        if (!err) {
            res.send("ok");
        }
        else {
            let errores = [];
            let campos = Object.keys(err.errors);

            for (let campo of campos) {
                errores.push(err.errors[campo].message);
            }

            res.send(errores);
        }
    });

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;