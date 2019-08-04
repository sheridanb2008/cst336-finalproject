const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql   = require("mysql");
const admin = require("./admin.js");
const tools = require("./tools.js")

// routes =========================

// root route
app.get("/", function(req, res){
   res.render("index.ejs");
});

app.get("/search", function(req, res){
   res.render("results.ejs");
});

app.get("/login", function(req, res) {
   res.render("login.ejs");
})

app.get("/adminLogin", function(req, res) {
   res.render("adminLogin.ejs");
})

app.get("/signUp", function(req, res) {
   res.render("signUp.ejs");
})

app.get("/dataEntry", function(req, res) {
   res.render("dataEntry.ejs");
})

app.use(express.urlencoded());
app.post("/api/addAircraft", function(req, res) {
  admin.addAircraft(req,res);
});

app.get("/adminList", function(req, res) {
   var sql;
    var sqlParams;
    var conn = tools.createConnection();
    sql = "SELECT * from aircraft";
    conn.connect(function(err) {
        if(err) throw(err);
            conn.query(sql,function(err,results,fields) {
                if(err) throw(err);
                var columns = [];
                fields.forEach(function(field) {
                  columns.push(field.name);
                })
                res.render("adminList", {"rows":results,"columns":columns});
              
        });
    });
});

// server listening
app.listen("8081", "0.0.0.0", function(){
   console.log("Running Express Server...")
});