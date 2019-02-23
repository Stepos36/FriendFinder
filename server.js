var express = require("express");
exphbs = require("express-handlebars");
path = require("path")
mysql = require("mysql")
app = express();
PORT = process.env.PORT || 3000;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/app/public')));
app.set('views', path.join(__dirname + '/app/views'));
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: 'app/views/layouts'
}));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "friend_finder_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/survey", function (req, res) {
  connection.query("SELECT * FROM questions", function (err, data) {
    if (err) throw err;
    res.render("survey", { question: data });
  });
});
app.get("/match", function (req, res) {
  var id = localStorage.getItem('matchId')
  connection.query("SELECT * FROM user_info WHERE id=?", id, function (err, data) {
    res.render("match", {
      picture: data[0].picture_url,
      name: data[0].username,
      age: data[0].age
    });
  })

});

app.post("/", function (req, res) {
  console.log('You sent, ' + JSON.stringify(req.body));
  connection.query("INSERT INTO user_info SET ?", {
    username: req.body.name,
    picture_url: req.body.pic,
    age: req.body.age
  },
    function (err, result) {
      if (err) throw err;

      res.redirect("/survey");
    });
  localStorage.setItem('username', req.body.name);
  localStorage.setItem('picture_url', req.body.pic);
  localStorage.setItem('age', req.body.age);
});
app.post("/survey", function (req, res) {
  var userId
  console.log('You sent, ' + JSON.stringify(req.body));
  connection.query("SELECT id FROM user_info WHERE username=? AND age = ?", [localStorage.getItem('username'), localStorage.getItem('age')],
    function (err, data) {
      if (err) throw err;
      userId = (data[0].id)
      answerArr = [parseInt(req.body.answer1),
      parseInt(req.body.answer2),
      parseInt(req.body.answer3),
      parseInt(req.body.answer4),
      parseInt(req.body.answer5),
      parseInt(req.body.answer6),
      parseInt(req.body.answer7),
      parseInt(req.body.answer8),
      parseInt(req.body.answer9),
      parseInt(req.body.answer10)
      ]
      compareValues(answerArr)
      connection.query("INSERT INTO user_answers SET ?", {
        'answers': JSON.stringify(answerArr),
        'user_id': userId
      },
        function (err, result) {
          if (err) throw err;
          res.redirect("/match");

          //
        });
    })
});

app.listen(PORT, function () {
  console.log("app listening on: http://localhost:" + PORT);
});

function compareValues(answerArr) {
  connection.query("SELECT * FROM user_answers", function (err, data) {
    var dataArr = []
        result = 0
        resultScore = 0
        resultArr = []
        parsedData = []
        scoresArray = []
        matchIndex = 0
        matchIndex = 0
        for (var j = 0; j < data.length; j++) {
          dataArr.push(data[j].answers)
        }
        for (var k = 0; k < dataArr.length; k++) {
          resultScore = 0
          resultArr = []
          parsedData = JSON.parse(dataArr[k])
          result = 0
          for (var i = 0; i < answerArr.length; i++) {
            result = 0
            result = parsedData[i] - answerArr[i]
            if (result < 0) { result = result * (-1) }
            resultArr.push(result)
          }
          for (var z = 0; z < resultArr.length; z++) {
            resultScore += resultArr[z]
          }
          scoresArray.push(resultScore)  
        }
        matchScore = (Array.min(scoresArray))
        matchIdex = scoresArray.indexOf(matchScore)
        userSearchParameter = data[matchIdex].user_id
        connection.query("SELECT * FROM user_info WHERE id =?", userSearchParameter, function(err, data) {
          localStorage.setItem('matchId',data[0].id )
        })
      })

  }

Array.min = function( array ){
  return Math.min.apply( Math, array );
};