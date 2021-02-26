var Questionnaire = function() {
    function getBySubjectId(req, res) {
        var sql =
          "select * from Questions where SubjectId = " + req.params.id;
        res.status(200).send('questionnaire.getBySubjectId');
        // DB.executeQuery(sql, res);
      }

      function getById(req, res) {
        var sql = `select * from Questions Where ID = ${req.params.id}`;
        res.status(200).send('questionnaire.getById');
        // DB.executeQuery(sql, res);
      }
      
      function getAll(req, res) {
        var sql =`Select* from Questions AS Q 
        Inner join Subject AS S  ON Q.SubjectId = S.ID`;
        res.status(200).send('questionnaire.getAll');
        // DB.executeQuery(sql, res);
      }
      
      function create(req, res) {
        const formObj = req.body.filter(item => item.hasOwnProperty('formName'));
        const questionnaire = req.body
        questionnaire.shift();
      
        var mySql = `insert into Questionnaire( SubjectId, Name, Criteria) 
        values (${formObj[0].subjectName}, '${formObj[0].formName}', '${JSON.stringify(questionnaire)}');`;
        res.status(200).send('questionnaire.create');
        // DB.executeQuery(mySql, res);
      }

      return {
        getBySubjectId: getBySubjectId,
        getById: getById,
        getAll: getAll,
        create: create
    }
}

module.exports = questionnaire;