const request = require('request');
const mysql = require('mysql');

module.exports = {

 createConnection: function() {

    var conn = mysql.createConnection({
        host:"cst336.ddns.net", 
        user: "cst2", 
        password:"3UaIr2cyEPJD81u", 
        database: "team_final"});
    
    return conn;
}
  
  
}