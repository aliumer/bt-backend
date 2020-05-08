var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var questionnaire = require('./app/questionnaire/router');
var students = require('./app/students/router');
var subjects = require('./app/subjects/router');
var app = express();

app.use(bodyParser.json());
app.use(cors());

// See the README about ordering of middleware
// Load the routes ("controllers" -ish)
app.use('/questionnaire', questionnaire);
app.use('/students', students);
app.use('/subjects', subjects);

// FINALLY, use any error handlers
// app.use(require('app/errors/not-found'))

// Export the app instance for unit testing via supertest
module.exports = app;