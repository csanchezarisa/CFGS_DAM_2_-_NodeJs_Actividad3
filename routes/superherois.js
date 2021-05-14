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
    });

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

    Superheroi.find().sort(req.params.prop).exec((err, documents) => {
        if (!err) {
            res.json(documents);
        }
        else {
            res.send("Error");
        }
    });

});

router.get('/vs/:idFirst/:idSecond', (req, res) => {

    Superheroi.findById(req.params.idFirst, (err, firstSuperheroe) => {
        if (!err) {
            
            Superheroi.findById(req.params.idSecond, (err, secondSuperheroe) => {

                if (!err) {

                    let avgFirst = (firstSuperheroe.inteligencia + firstSuperheroe.forca + firstSuperheroe.velocitat + firstSuperheroe.resistencia + firstSuperheroe.poder + firstSuperheroe.habilitat + firstSuperheroe.pes) / 6;
                    let avgSecond = (secondSuperheroe.inteligencia + secondSuperheroe.forca + secondSuperheroe.velocitat + secondSuperheroe.resistencia + secondSuperheroe.poder + secondSuperheroe.habilitat + secondSuperheroe.pes) / 6;

                    if (avgFirst > avgSecond) {
                        res.json(firstSuperheroe);
                    }
                    else if (avgSecond > avgFirst) {
                        res.json(secondSuperheroe);
                    }
                    else {
                        let response = {
                            first: firstSuperheroe,
                            second: secondSuperheroe
                        };

                        res.json(response);
                    }
                }
                else {
                    res.send("Error");
                }

            });

        }
        else {
            res.send("Error");
        }
    });

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

    let dadesSuperheroi = {
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
    };

    Superheroi.findByIdAndUpdate(req.params.id, dadesSuperheroi, {runValidators: true}, err => {
        if (!err) {
			res.send("ok");
		} 
        else {
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

			res.json(errores);
		}
    })
});

router.delete('/:id', (req, res) => {

    Superheroi.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("error");
        }
        res.send("ok");
    })

});

module.exports = router;