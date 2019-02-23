var compareValues = require('./apiRoutes.js')

var routes = function() {

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
            });
        })
    });

}

module.exports = routes