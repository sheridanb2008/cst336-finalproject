const request = require('request');
const mysql = require('mysql');

module.exports = {

 createConnection: function() {

    var conn = mysql.createConnection({
        host:"localhost", 
        user: "root", 
        password:"finalExam1", 
        database: "team_final"});
    
    return conn;
},
  setSession: function(req, res) {
    //if(!req.session.user) {
    //  req.session.user = {}
    //}
}
  
  
}