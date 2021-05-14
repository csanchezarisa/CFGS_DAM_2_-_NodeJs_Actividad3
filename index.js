const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/superherois', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(3000);