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

function buildMenuBar(req) {
    var menuHTML = '<a class="navLink" id="navLinkHome" href="/">Home</a>';
    menuHTML += '<a class="navLink"id="navLinkAircraft" href="/airplaneSearch">Aircraft</a>';
    if(!req.session.authenticated) {
        menuHTML += '<a class="navLink"id="navLinkLogin" href="/userLoginAction">Log in</a>';
    }
    else{
        if(!req.session.isAdmin) {
            menuHTML += '<a class="navLink"id="navLinkLogin" href="/userLogoutAction">Log out</a>';
        }
    }
    menuHTML += '<a class="navLink"id="navLinkSignUp" href="/signUp">Create an account</a>';
    if(req.session.authenticated && req.session.isAdmin) {
        menuHTML +='<a class="navLink" id="navLinkAdminLogin" href="/adminLogoutAction">Admin log out</a>';
    }
    else{
        menuHTML +='<a class="navLink" id="navLinkAdminLogin" href="/adminLoginAction">Admin log in</a>';
    }

    return menuHTML;
}

// routes =========================

// root route
app.get("/", function(req, res){
   res.render("index.ejs", {"menuBarHTML" : buildMenuBar(req)});
});

app.get("/airplaneSearch", async function(req, res){
  
  var conn = tools.createConnection();
  var sql  = "SELECT DISTINCT manufacturer FROM `aircraft` ORDER BY manufacturer";
  var sql2 = "SELECT DISTINCT engineType FROM `aircraft` ORDER BY engineType";

  conn.connect(function(err) {

    if (err) throw err;
    conn.query(sql, function(err, result) {
       if (err) throw err;
       conn.query(sql2, function(err, results) {
         if (err) throw err;
         res.render("airplaneSearch", {"make": result, "engine": results, "menuBarHTML" : buildMenuBar(req)});
       })
    })
  });
}); // airplaneSearch route

app.get("/search", async function(req, res){

  let make = req.query.make;
  let engine = req.query.engine;
  let priceStart = req.query.priceStart;
  let priceEnd = req.query.priceEnd;
  let hoursStart = req.query.hoursStart;
  let hoursEnd = req.query.hoursEnd;
  console.log(make);
  console.log(engine);
  console.log(priceStart);
  console.log(priceEnd);
  console.log(hoursStart);
  console.log(hoursEnd);

  let conn = tools.createConnection();
  let sql  = "SELECT * FROM aircraft WHERE  manufacturer = '" + make + "' OR engineType = '" + engine + "'";
  conn.connect(function(err) {
    if(err) throw(err);
        conn.query(sql,function(err,results,fields) {
            if(err) throw(err);
            var columns = [];
            fields.forEach(function(field) {
              columns.push(field.name);
            })
            res.render("results", {"rows":results,"columns":columns, "menuBarHTML" : buildMenuBar(req)});

    });
});

}); // search route

app.get("/userLoginAction", function(req, res) {
   res.render("login.ejs", {"loginError":"","menuBarHTML" : buildMenuBar(req)});
})

app.get("/adminLogin", function(req, res) {
   res.render("adminLogin.ejs", {"menuBarHTML" : buildMenuBar(req)});
})

app.get("/adminMain", function(req, res) {
  res.render("adminMain.ejs",{"menuBarHTML" : buildMenuBar(req)});
})

app.get("/signUp", function(req, res) {
   res.render("signUp.ejs",{"loginError":"","menuBarHTML" : buildMenuBar(req)});
})

app.get("/dataEntry", function(req, res) {
//   console.log(req.query.results);
  var results = [{
  id: '',
  year: '',
  manufacturer: '',
  model: '',
  price: '',
  serialNumber: '',
  totalTime: '',
  engineType: '',
  smoh: '',
  inspection: '',
  numberSeats: '',
  imageURL: ''
}]
  console.log(req.query.id);
  
  if(req.session.authenticated && req.session.isAdmin) {
   
    res.render("dataEntry.ejs",{"menuBarHTML" : buildMenuBar(req),"results":results});
  }
  else {
    res.render("adminLogin.ejs", {"loginError":"Sign in as an administrator.","menuBarHTML" : buildMenuBar(req)});
  }
})


app.post("/api/addAircraft", function(req, res) {
  
  
  if(req.session.authenticated) {
    console.log("isAdmin: " + req.session.isAdmin);
    if(req.body.form != '') {
    admin.updateAircraft(req,res);  
    }else{
    admin.addAircraft(req,res);
  }}
  else {
      res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again.","menuBarHTML" : buildMenuBar(req)});
  }
});

//  Delete Aircraft
app.post("/api/deleteAircraft", async function(req, res) {
   
  if(req.session.authenticated) {
      console.log("isAdmin: " + req.session.isAdmin);
      admin.deleteAircraft(req,res);    
  }
  else {
      res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again."});
  }
});

// Modify Aircraft
app.get("/modifyAircraft", function(req, res) {
// res.render("dataEntry.ejs");
     if(req.session.authenticated) {
//     res.render("dataEntry.ejs");
    var sql;
    var sqlParams = req.query.id;
    var conn = tools.createConnection();
    sql = "SELECT * from aircraft WHERE id = ?";
    conn.connect(function(err) {
        if(err) throw(err);
            conn.query(sql, sqlParams, function(err,results) {
                if(err) throw(err);
                  res.render("dataEntry.ejs",{"menuBarHTML" : buildMenuBar(req), "results":results});
        });
    });
  }
  else {
    res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again.","menuBarHTML" : buildMenuBar(req)});
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
    res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try Again.","menuBarHTML" : buildMenuBar(req)});
  }
});

app.get("/adminLoginAction", function(req, res) {
  res.render("adminLogin.ejs", {"loginError":"", "menuBarHTML" : buildMenuBar(req)});
});

app.get("/userLoginAction", function(req, res) {
  res.render("login.ejs", {"loginError":"", "menuBarHTML" : buildMenuBar(req)});
});

app.get("/userLogoutAction", function(req, res) {
    req.session.authenticated = false;
    req.session.isAdmin = false;
    res.render("index.ejs", {"loginError":"", "menuBarHTML" : buildMenuBar(req)});
});

app.get("/adminLogoutAction", function(req, res) {
    req.session.authenticated = false;
    req.session.isAdmin = false;
    res.render("index.ejs", {"loginError":"", "menuBarHTML" : buildMenuBar(req)});
});
  

app.post("/userAuthenticate", async function(req,res) {
  var loginSuccessful = await admin.userLogin(req,res,false); 
  if(loginSuccessful) {      
    req.session.authenticated = true;
    console.log("User authenticated.");
    //todo: This is a placeholder for the main logged in user page
    res.render("index.ejs",{"menuBarHTML" : buildMenuBar(req)}); 
  }
  else {
      res.render("login.ejs", {"loginError":"Invalid password or user id.","menuBarHTML" : buildMenuBar(req)});
    }
});

app.post("/createUser", async function(req,res) {
  var userExists = await admin.userAlreadyExists(req.body.email);
  if(userExists) {
    res.render("signUp.ejs", {"loginError":"A user with this email address already exists","menuBarHTML" : buildMenuBar(req)});
    return;
  }
  else{
    var userCreated = await admin.createUser(req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.agreeSpam);
    if(userCreated) {
      res.render("login.ejs", {"loginError":"User account created successfully. You can now login.","menuBarHTML" : buildMenuBar(req)});
    }
    else {
      res.render("signUp.ejs", {"loginError":"Unknown error creating user.","menuBarHTML" : buildMenuBar(req)});
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
                  res.render("adminList", {"rows":results,"columns":columns,"menuBarHTML" : buildMenuBar(req)});
          });
      });
    }
  else {
    //todo: render failed login
    res.render("adminLogin.ejs", {"loginError":"Incorrect username or password. Try again.","menuBarHTML" : buildMenuBar(req)});
  }
  
});

// server listening
app.listen("8081", "0.0.0.0", function(){
   console.log("Running Express Server...")
});