var express = require("express");
    exphbs = require("express-handlebars");
    path = require("path")
    mysql = require("mysql")
    app = express();
    PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/app/public')));
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
    res.render("index");
  });
app.get("/survey", function(req, res) {
    connection.query("SELECT * FROM questions;", function(err, data) {
      if (err) throw err;
      res.render("survey", { question: data });
    });
  });
app.get("/match", function(req, res) {
      if (err) throw err;
      res.render("match", { 
                            picture: 'pic',
                            name: 'name',
                            age: 'age' 
                        });
  });

app.post("/", function(req, res) {
    console.log('You sent, ' + JSON.stringify(req.body));
    connection.query("INSERT INTO user_info SET ?", {
                                                        username: req.body.name,
                                                        picture_url: req.body.pic,
                                                        age: req.body.age
                                                    }, 
    function(err, result) {
        if (err) throw err;

        res.redirect("/survey");
      });
});
app.post("/survey", function(req, res) {
    console.log('You sent, ' + JSON.stringify(req.body));
    connection.query("INSERT INTO user_answers SET ?", {
                                                        'answer 1': req.body.answer1,
                                                        'answer 2': req.body.answer2,
                                                        'answer 3': req.body.answer3,
                                                        'answer 4': req.body.answer4,
                                                        'answer 5': req.body.answer5,
                                                        'answer 6': req.body.answer6,
                                                        'answer 7': req.body.answer7,
                                                        'answer 8': req.body.answer8,
                                                        'answer 9': req.body.answer9,
                                                        'answer 10': req.body.answer10,
                                                    }, 
    function(err, result) {
    if (err) throw err;
    res.redirect("/match");
});
});

app.listen(PORT, function() {
  console.log("app listening on: http://localhost:" + PORT);
});

