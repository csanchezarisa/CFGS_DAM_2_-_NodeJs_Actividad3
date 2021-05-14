const mongoose = require('mongoose');

const superheroiSchema = mongoose.Schema({
    nom: {
        type: String,
        maxLength: 20,
        required: [true, "El nombre es obligatorio"]
    },
    genere: {
        type: String,
        enum: ["Masculino", "Femenino"],
        required: [true, "El género es obligatorio"]
    },
    raca: {
        type: String,
        required: false
    },
    alcada: {
        type: Number,
        min: 0,
        required: [true, "La altura es obligatoria"]
    },
    pes: {
        type: Number,
        min: 0,
        required: [true, "El peso es obligatorio"]
    },
    llocNaixement: {
        type: String,
        required: false
    },
    inteligencia: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "La inteligencia es obligatoria"]
    },
    forca: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "La fuerza es obligatoria"]
    },
    velocitat: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "La velocidad es obligatoria"]
    },
    resistencia: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "La resistencia es obligatoria"]
    },
    poder: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "El poder es obligatoria"]
    },
    habilitat: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "La habilidad en combate es obligatoria"]
    }
});

const Superheroi = mongoose.model("superherois", superheroiSchema);

module.exports = Superheroi;