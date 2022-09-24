var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

var dbConn = require('../../config/db.js');

router.post('/timein', (req,res)=>{

    const token =  req.headers.authorization.split(' ')[1];


    if(!token){
        res.status(200).json({success:false,msg:'Error, Token was not found'});
    }

    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

    console.log(decodedToken);

    var employeeid = req.body.employeeid;
    var jobid = req.body.jobid;
    
    var dateandtime = new Date();
    SQLquery = `INSERT INTO timein (employeeid,jobid,date) VALUE ("${employeeid}","${jobid}","${dateandtime}")` ;
    dbConn.query(SQLquery, function(error, results,fields)
    {
        if(error) throw error;
        res.status(200).json(results);
    });
});

router.post('/timeout', (req,res)=>{

    const token =  req.headers.authorization.split(' ')[1];


    if(!token){
        res.status(200).json({success:false,msg:'Error, Token was not found'});
    }

    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

    console.log(decodedToken);

    var employeeid = req.body.employeeid;
    var jobid = req.body.jobid;
    
    var dateandtime2 = new Date();
    SQLquery = `INSERT INTO timeout (employeeid,jobid,date) VALUE ("${employeeid}","${jobid}","${dateandtime2}")` ;
    dbConn.query(SQLquery, function(error, results,fields)
    {
        if(error) throw error;
        res.status(200).json(results);
    });
});

router.post('/report', (req,res)=>{

    const token =  req.headers.authorization.split(' ')[1];


    if(!token){
        res.status(200).json({success:false,msg:'Error, Token was not found'});
    }

    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

    console.log(decodedToken);

    var employeeid = req.body.employeeid;
    var jobid = req.body.jobid;
    var dutyid = req.body.dutyid;
    var leaveid = req.body.leaveid;
    
    var dateandtime = new Date();
    SQLquery = `INSERT INTO summary (reportid,employeeid,dutyid,jobid,leaveid,date) VALUE (NULL,"${employeeid}","${dutyid}","${jobid}","${leaveid}","${dateandtime}")`;
    dbConn.query(SQLquery, function(error, results,fields)
    {  
        if(error) throw error;
        res.status(200).json(results);
    });
});


module.exports = router;