const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql   = require("mysql");

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

// server listening
app.listen("8081", "0.0.0.0", function(){
   console.log("Running Express Server...")
});