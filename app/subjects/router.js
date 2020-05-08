var router = require('express').Router();
var DB = require('../../db');

function getAll(req, res) {
  console.log('subjects getAll::');
  var sql = "select * from Subject";
  res.status(200).send('subjects.getAll');
  // DB.executeQuery(sql, res);
}

router.get('/', getAll);

module.exports = router;
