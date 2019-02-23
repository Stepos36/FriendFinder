var apiRoutes = function() {

    app.get("/api/friends", function (req, res) {
        connection.query("SELECT * FROM user_info", function(err,data) {
            res.json(data);
        })
    });
    app.post("/api/friends", function (req, res) {
        console.log('You sent, ' + JSON.stringify(req.body));
        connection.query("INSERT INTO user_info SET ?", {
            username: req.body.name,
            picture_url: req.body.pic,
            age: req.body.age
          },
            function (err, result) {
              if (err) throw err;
              var friends = []
            connection.query("SELECT * FROM user_info", function(err, data) {
                friends = data
                res.json(friends)
                console.log(friends)
            })
            })
        })
}

var compareValues =function(answerArr) {
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
module.exports = compareValues
module.exports = apiRoutes