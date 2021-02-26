var sql = require("mssql");
var config = require("./config");

module.exports = {
  executeQuery: (query, res) => {
    sql.connect(config).then(pool => {
      return pool.request().query(query);
    }).then(result => {
      sql.close();
      res.status(200).send(result.recordset);
    }).catch(err => { 
      console.error(err);
      sql.close();
      res.status(501).send(err);
    });
  },

  executeMultipleQuery: (query, res) => {
    sql.connect(config).then((pool) => {
      return pool.request().query(query);
    }).then(result => {
      sql.close();
      res.status(200).send(result.recordsets)
    }).cath(err => {
      console.error(err);
      sql.close();
      res.status(501).send(err);
    });
  },

  executeSelect: (query, res) => {
    sql.connect(config).then((pool) => {
      return pool.request().query(query);
    }).then(result => {
      sql.close();
      res.status(200).send(result.recordset)
    }).cath(err => {
      console.error(err);
      sql.close();
      res.status(501).send(err);
    });
  }
  
}