const request = require("request");
const mysql   = require("mysql");
const express   = require("express");
const session   = require("express-session");
const admin = require("./admin.js");
const tools = require("./tools.js")

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: "nwtech secret",
  resave: true,
  saveUninitialized: true
}));

// routes =========================

// root route
app.get("/", function(req, res){
   res.render("index.ejs");
});

app.get("/search", function(req, res){
   res.render("results.ejs");
});

app.get("/userLoginAction", function(req, res) {
   res.render("login.ejs", {"loginError":""});
})

app.get("/adminLogin", function(req, res) {
   res.render("adminLogin.ejs");
})

app.get("/signUp", function(req, res) {
   res.render("signUp.ejs",{"loginError":""});
})

app.get("/dataEntry", function(req, res) {
  if(req.session.authenticated && req.session.isAdmin) {
   res.render("dataEntry.ejs");
  }
  else {
    res.render("adminLogin.ejs", {"loginError":"Sign in as an administrator."});
  }
})


app.post("/api/addAircraft", function(req, res) {
  if(req.session.authenticated) {
    console.log("isAdmin: " + req.session.isAdmin);
    admin.addAircraft(req,res);
  }
  else {
      res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again."});
  }
});

//This is a temporary route while the admin login gets worked out.
app.get("/adminList", function(req, res) {
  if(req.session.authenticated) {
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
  }
  else {
    res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again."});
  }
});

app.get("/adminLoginAction", function(req, res) {
  res.render("adminLogin.ejs", {"loginError":""});
});

app.get("/userLoginAction", function(req, res) {
  res.render("login.ejs", {"loginError":""});
});

app.post("/userAuthenticate", async function(req,res) {
  var loginSuccessful = await admin.userLogin(req,res,false); 
  if(loginSuccessful) {      
    req.session.authenticated = true;
    console.log("User authenticated.");
    //todo: This is a placeholder for the main logged in user page
    res.render("index.ejs"); 
  }
  else {
      res.render("login.ejs", {"loginError":"Invalid password or user id."});
    }
});

app.post("/createUser", async function(req,res) {
  var userExists = await admin.userAlreadyExists(req.body.email);
  if(userExists) {
    res.render("signUp.ejs", {"loginError":"A user with this email address already exists"});
    return;
  }
  else{
    var userCreated = await admin.createUser(req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.agreeSpam);
    if(userCreated) {
      res.render("login.ejs", {"loginError":"User account created successfully. You can now login."});
    }
    else {
      res.render("signUp.ejs", {"loginError":"Unknown error creating user."});
    }
  }
});

app.post("/adminAuthenticate", async function(req,res) {
    var loginSuccessful = await admin.userLogin(req,res,true);  
  
    if(loginSuccessful) {      
      req.session.authenticated = true;
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
    }
  else {
    //todo: render failed login
    res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again."});
  }
  
});

// server listening
app.listen("8081", "0.0.0.0", function(){
   console.log("Running Express Server...")
});