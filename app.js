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
app.post("/addAircraft", function(req, res) {
  admin.addAircraft(req,res);
});

// server listening
app.listen("8081", "0.0.0.0", function(){
   console.log("Running Express Server...")
});