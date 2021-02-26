var router = require('express').Router();
var DB = require('../../db');

function getAll(req, res) {
    var sql =`Select * from tblCustomer;`;
    //res.status(200).send('questionnaire.getAll');
    DB.executeQuery(sql, res);
}
router.get('/getAll', getAll);

module.exports = router;
