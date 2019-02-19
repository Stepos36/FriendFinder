var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path")
var mysql = require("mysql")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views',  path.join(__dirname+'/app/views'));
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir:'app/views/layouts'
    }));
 app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "friend_finder_db"
  });

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    connection.query("SELECT * FROM questions;", function(err, data) {
      if (err) throw err;
      res.render("index", { question: data });
    });
  });
  

app.listen(PORT, function() {
  console.log("app listening on: http://localhost:" + PORT);
});