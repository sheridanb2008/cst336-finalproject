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
// createConnection: function() {

//     var conn = mysql.createConnection({
//         host:"localhost", 
//         user: "root", 
//         password:"", 
//         database: "team_final"});
    
//     return conn;
// }
  
  
}