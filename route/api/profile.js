var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

var dbConn = require('../../config/db.js');


router.get('/mydata/:table', (req,res)=>{
    console.log(req.params.like);

    const token =  req.headers.authorization.split(' ')[1];


    if(!token){
        res.status(200).json({success:false,msg:'Error, Token was not found'});
    }

    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);

    console.log(decodedToken);
    var employeeid = req.body.employeeid
    var table = req.params.table;
    SQLquery = `SELECT * FROM ${table} WHERE employeeid LIKE '%${employeeid}%' `;
    dbConn.query(SQLquery, function(error, results,fields)
    {
        if(error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;