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

module.exports = apiRoutes