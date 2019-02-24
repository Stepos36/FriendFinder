var routes = function() {

    app.get("/", function (req, res) {
      localStorage.setItem('matchID', '')
      if(localStorage.getItem('username')) {res.redirect('/survey')}
      else {res.render("index");}
    });
    app.get("/survey", function (req, res) {
      connection.query("SELECT * FROM questions", function (err, data) {
        if (err) throw err;
        res.render("survey", { 
                              question: data, 
                              name: localStorage.getItem('username'),
                              age: localStorage.getItem('age'),
                              pic: localStorage.getItem('picture_url') 
                            });
      });
    });
    app.get("/match", function (req, res) {
      var id = localStorage.getItem('matchId')
      connection.query("SELECT * FROM user_info WHERE id=?", id, function (err, data) {
        console.log(data)
        res.render("match", {
          picture: data[0].picture_url,
          name: data[0].username,
          age: data[0].age
        });
      })
    });
    app.get("/all", function (req, res) {
      connection.query("SELECT * FROM user_info", function (err, data) {
        res.render("all", {people:data});
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
          answerArr = [parseInt(req.body.answer2),
          parseInt(req.body.answer12),
          parseInt(req.body.answer22),
          parseInt(req.body.answer32),
          parseInt(req.body.answer42),
          parseInt(req.body.answer52),
          parseInt(req.body.answer62),
          parseInt(req.body.answer72),
          parseInt(req.body.answer82),
          parseInt(req.body.answer92)
          ]
          compareValues(answerArr)
          console.log(localStorage.getItem('matchID'))
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
    app.post("/dropname", function (req, res) {
      localStorage.setItem('username', '');
      localStorage.setItem('picture_url','');
      localStorage.setItem('age', '');
      res.redirect("/");
    })
}
var compareValues =function(answerArr) {
  console.log('hi')
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
        localStorage.setItem('matchId',userSearchParameter )
      })

  }

Array.min = function( array ){
  return Math.min.apply( Math, array );
};
module.exports = routes