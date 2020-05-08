var router = require('express').Router();
var DB = require('../../db');
var ourConfig = require("../../config");
var sql = require("mssql");

function create(req, res) {
  res.status(200).send('students.create');
  // const student = req.body;
  // sql.connect(ourConfig, function () {
  //   var request = new sql.Request();
  //   request.input("RefNumber", sql.VarChar(10), student.refNumber);
  //   request.input("FirstName", sql.VarChar(50), student.firstName);
  //   request.input("LastName", sql.VarChar(50), student.lastName);
  //   request.input("Gender", sql.Char(1), student.gender);
  //   request.input("Year", sql.VarChar(10), student.year);
  //   request.input("Subjects", sql.VarChar(50), student.subject.join(","));
  //   request
  //     .execute("student_insert")
  //     .then(function (err, recordsets, returnValue, affected) {
  //       console.dir(err);
  //       res.send(res.statusCode);
  //     })
  //     .catch(function (err) {
  //       res.send(err);
  //     });
  // });
}

function search(req, res) {
  console.log('in students search');
  var obj = req.body;
  var mySql = `SELECT *, dbo.getStudentSubject(S.ID) AS Subjects FROM Student S left outer JOIN PTM P ON S.ID = P.StudentID 
    where S.RefNumber IS NULL OR S.RefNumber='${obj.refNumber}' 
    OR S.FirstName IS NULL OR S.FirstName like '%${obj.firstName}%' 
    OR S.LastName IS NULL OR S.lastname like '%${obj.lastName}%'`;
    res.status(200).send('search');
  // DB.executeSelect(mySql, res);
}

function getByRef(req, res) {
  var sql = `select ID, FirstName + ' ' + LastName as Name from Student where RefNumber = '${req.params.id}'`;
  res.status(200).send('get student by ref:' + sql);
  // DB.executeQuery(sql, res);
}

function subjects(req, res) {
  var sql = `select SS.SubjectId, Subject.SubjectName  from StudentSubjects SS
    inner join subject on subject.id = SS.SubjectId 
    where SS.StudentId = '${req.params.id}'`;
    res.status(200).send('get subjects by student id:' + sql);
    // DB.executeQuery(sql, res);
}


function getById(req, res) {
  var mySql = `select s.*, dbo.getStudentSubject(s.id) as subjects from student s where s.id = ${req.params.id};
    select S.SubjectName, TC.Comments, TC.CreatedDate from TeacherComments AS TC 
    Inner join Subject AS S ON TC.SubjectID = S.ID where StudentID = ${req.params.id};
    select * from TestRecord Where StudentId = ${req.params.id}`;
  res.status(200).send('getById: ' + mySql);
  // DB.executeMultipleQuery(mySql, res);
}

router.post('/create', create);
router.post('/search', search);
router.get('/:id/byref', getByRef);
router.get('/:id/subjects', subjects);
router.get('/:id', getById);

module.exports = router;
