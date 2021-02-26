require('dotenv').config();
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var questionnaire = require('./app/questionnaire/router');
var students = require('./app/students/router');
var subjects = require('./app/subjects/router');
var inventory = require('./app/inventory/router');
var jwt = require('jsonwebtoken');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/questionnaire', authenticateToken ,questionnaire);
app.use('/students', authenticateToken, students);
app.use('/subjects', authenticateToken, subjects);
app.use('/inventory', authenticateToken, inventory);

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken: accessToken});
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null ) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

}
// FINALLY, use any error handlers
// app.use(require('app/errors/not-found'))

// Export the app instance for unit testing via supertest
module.exports = app;