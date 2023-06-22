const express = require('express');
const router = express.Router();

const mysql = require('mysql')
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'noori',
    database: 'employee'
    
})

mysqlConnection.connect((err) =>{
    if(!err)
      console.log('DB connection succeeded');
    else
      console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
})


//get all employee details
router.get('/', function(req, res, next) {
    mysqlConnection.query('SELECT * FROM employeedetails',  (error, rows, fields)=> {
        if (!error) 
        res.send(rows);
        else
        throw error;
      });
  });

  //get employee by id 
  router.get('/:id', function(req, res, next) {
    mysqlConnection.query('SELECT * FROM employeedetails WHERE id=?', [req.params.id], (error, rows, fields)=> {
        if (!error) 
        res.send(rows);
        else
        throw error;
      });
  });

  //Add employee details
router.post('/add',(req,res,next) =>{
    const params = req.body;
    mysqlConnection.query('INSERT INTO employeedetails SET ?', params, function (err, results, fields) {
        if (err) throw err;
        else
        res.send(`Employee with the name: ${params.name} has been added`);
      });
    });

//Update employee details
router.put('/update',(req,res,next) =>{
        const {id,name,designation,salary} = req.body;
        mysqlConnection.query('UPDATE employeedetails SET name=? , salary=? WHERE id=?', [name,salary,id], function (err, results, fields) {
            if (err) throw err;
            else
            res.send(`Employee with the name: ${name} has been updated`);
          });
        });
//delete employeee by id
router.delete('/delete/:id',(req,res,next) =>{
   
    mysqlConnection.query('DELETE FROM employeedetails WHERE id=?', [req.params.id], function (err, results, fields) {
        if (err) throw err;
        else
        res.send(`Employee with the id: ${req.params.id} has been deleted`);
      });
    });
module.exports = router;
