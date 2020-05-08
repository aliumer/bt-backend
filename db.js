var sql = require("mssql");
var config = require("./config");

module.exports = {
  executeQuery: (query, res) => {
    sql.connect(config, () => {
      var request = new sql.Request();
      request.query(query, (err, data) => {
        if (err) {
          console.log(JSON.stringify(err));
          res.status(501).send(err);
        }  else {
          res.status(200).send(data.recordset);
        }
      });
    });
  },

  executeMultipleQuery: (query, res) => {
    sql.connect(config, () => {
      var request = new sql.Request();
      request.query(query, (err, data) => {
        if (err) {
          console.log(JSON.stringify(err));
          res.status(501).send(err);
        } else {
          res.status(200).send(data.recordsets);
        }
      });
    });
  },

  executeSelect: (query, res) => {
    sql.connect(config, () => {
      var request = new sql.Request();
      request.query(query, (err, data) => {
        if (err) {
          console.log(JSON.stringify(err));
          res.status(501).send(err);
        } else {
          res.status(200).send(data.recordsets[0]);
        }
      });
    });
  }
  
}