var express = require('express');

var router = express.Router();

const jwt = require('jsonwebtoken');

var dbConn = require('../../config/db.js');

router.post('/signup/all',(req,res,next)=>{

    var employeeid = req.body.employeeid;
    var firstname  = req.body.firstname;
    var surname  = req.body.surname;
    var contactnumber  = req.body.contactnumber;
    var username  = req.body.username;
    var password  = req.body.password;
    var age  = req.body.age;
    var gender  = req.body.gender;
    var email  = req.body.email;
    var departmentid  = req.body.departmentid;
    var departmentname  = req.body.departmentname;
    var jobid  = req.body.jobid;
    var jobtitle  = req.body.jobtitle;

    //var userID ="";


    try {
        SQLquery = `INSERT INTO employee(employeeid,firstname,surname,contactnumber,username,password,age,gender,email) VALUES ("${employeeid}","${firstname}","${surname}","${contactnumber}","${username}","${password}","${age}","${gender}","${email}");`; 
        SQLquery += `INSERT INTO department(departmentid,departmentname) VALUE ("${departmentid}","${departmentname}")`;
        SQLquery += `INSERT INTO jobtitle (jobid,departmentid,jobtitle) VALUE ("${jobid}","${departmentid}","${jobtitle}")`;
        
        
        dbConn.query(SQLquery,function(error,results){
            //console.log(employeeid);
            //userID = results.insertID;
            res.status(200).json({success:true});           

        });   
    } catch (error) {
        console.log(error);
        return next(error);  
    }
});


router.post('/signup/employee',(req,res,next)=>{

    var employeeid = req.body.employeeid;
    var firstname  = req.body.firstname;
    var surname  = req.body.surname;
    var contactnumber  = req.body.contactnumber;
    var username  = req.body.username;
    var password  = req.body.password;
    var age  = req.body.age;
    var gender  = req.body.gender;
    var email  = req.body.email;
    //var userID ="";


    try {
        SQLquery = `INSERT INTO employee(employeeid,firstname,surname,contactnumber,username,password,age,gender,email) VALUES ("${employeeid}","${firstname}","${surname}","${contactnumber}","${username}","${password}","${age}","${gender}","${email}")`; 
        
        dbConn.query(SQLquery,function(error,results){
            //console.log(employeeid);
            //userID = results.insertID;
            res.status(200).json({success:true});           

        });   
    } catch (error) {
        console.log(error);
        return next(error);  
    }
});

router.post('/signup/department',(req,res,next)=>{


    var departmentid  = req.body.departmentid;
    var departmentname  = req.body.departmentname;

    //var userID ="";


    try {
        SQLquery = `INSERT INTO department(departmentid,departmentname) VALUE ("${departmentid}","${departmentname}")`;

        dbConn.query(SQLquery,function(error,results){
            //console.log(employeeid);
            //userID = results.insertID;
            res.status(200).json({success:true});           

        });   
    } catch (error) {
        console.log(error);
        return next(error);  
    }
});

router.post('/signup/job',(req,res,next)=>{

    var departmentid  = req.body.departmentid;
    var jobid  = req.body.jobid;
    var jobtitle  = req.body.jobtitle;
    //var userID ="";


    try {
        SQLquery = `INSERT INTO jobtitle (jobid,departmentid,jobtitle) VALUE ("${jobid}","${departmentid}","${jobtitle}")`;
        
        dbConn.query(SQLquery,function(error,results){
            //console.log(employeeid);
            //userID = results.insertID;
            res.status(200).json({success:true});           

        });   
    } catch (error) {
        console.log(error);
        return next(error);  
    }
});

router.post('/login',(req,res,next)=>{

    var username  = req.body.username;
    var password  = req.body.password;

    try {
        SQLquery = `SELECT  * FROM employee WHERE username = "${username}" AND password = "${password}"`;  
        dbConn.query(SQLquery,function(error,results){
            console.log(results);
            Object.keys(results).forEach(function(key){
                var row = results[key]

                var username = row.username;
                var email = row.email;

                var data = {
                    username : row.username,
                    email : row.email,

                }

                token = jwt.sign({data:data},process.env.SECRET_TOKEN,{expiresIn:'1h'});   
                console


                res.status(200).json({success:true, token :token});
                
            });


            //console.log(results.username);
            //res.status(200).json({success:true, datas :data});
        });   
    } catch (error) {
        console.log(error);
        return next(error);  
    }
});


module.exports = router;