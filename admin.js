const request = require('request');
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const tools = require("./tools.js")
const session = require('express-session')

module.exports = {
  
  //TODO: validate the admin session
 addAircraft: function(req, res) {
   //Get the parameters from the request
   var year = req.body.year;
   var manufacturer = req.body.manufacturer;   
   var model = req.body.model;
   //condition is a reserved mysql keyword, so we use aircraft_condition
   var aircraftCondition = req.body.condition;
   var serialNumber = req.body.serialNumber;
   var totalTime = req.body.totalTime;
   var totalLandings = req.body.totalLandings;
   var engineType = req.body.engineType;
   var engineHours = req.body.engineHours;
   var engineCycles = req.body.engineCycles;
   var adsbEquipped = false;
   if(req.body.adsbEquipped=="yes")
      adsbEquipped = true;
   var avionics = req.body.avionics;
   var colorScheme = req.body.colorScheme;
   var numberSeats = req.body.numberSeats;
   var galley = false;
   if(req.body.galley=="yes")
     galley = true;
   var galleyConfig = req.body.galleyConfig;
   var interior = req.body.interior;
   var lavatory = false;
   if(req.body.lavatory=="yes")
     lavatory = true;
   var lavatoryConfig = req.body.lavatoryConfig;
   var inspection = req.body.inspection;
   var sqlParams = [
     year,manufacturer,model,aircraftCondition,serialNumber,totalTime,totalLandings,
     engineType,engineHours,engineCycles,adsbEquipped,avionics,colorScheme,
     galley,galleyConfig,lavatory,lavatoryConfig,inspection,numberSeats,interior     
   ] ;
   var sql = "INSERT INTO aircraft (year,manufacturer,model,aircraftCondition," + 
       "serialNumber,totalTime,totalLandings,engineType,engineHours,engineCycles," + 
       "adsbEquipped,avionics,colorScheme,galley,galleyConfig,lavatory,lavatoryConfig,inspection,numberSeats,interior) " +
       "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
   var conn = tools.createConnection();
   conn.connect(function(err) {
     
        if(err) 
          throw(err);
     console.log("connected.");
        conn.query(sql,sqlParams,function(err,results) {
          if(err)
            console.log(err);
          res.send("OK");
        });
    });
   
   // push them to the db
 },
  
adminLogin : function(req) {
  return new Promise( function(resolve,reject) {
    //Query if the username/password match    
    var conn = tools.createConnection();
    var sql = "SELECT id,email,passwordHash from administrators where username=?";
    var sqlParams = [req.body.username]
    conn.connect(function(err) {     
        if(err) 
          throw(err);
     
        conn.query(sql,sqlParams,function(err,results) {
          if(results.length<1) {
            resolve(false);
            return;
          }
          if(err)
            console.log(err);
          bcrypt.compare(req.body.password, results[0].passwordHash, function(err, res) {
            resolve(res);
          });
        });
    });
    
  });
}


}