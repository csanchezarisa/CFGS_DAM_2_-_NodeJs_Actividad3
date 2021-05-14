const express = require('express');
const mongoose = require('mongoose');
const app = express();
const superherois = require('./routes/superherois');

mongoose.connect('mongodb://localhost/superherois', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use('/superheroes', superherois);

app.all('*', (req, res) => {
    res.send('Recurso no encontrado')
});

app.listen(3000);