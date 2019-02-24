var mysql = require("mysql")
    PORT = process.env.PORT || 3000;
    connection = mysql.createConnection({
      host: "us-cdbr-iron-east-03.cleardb.net",
      port: 3306,
      user: "b88c3be95b06d2",
      password: "dce6caad",
      database: "heroku_8cbe70c838925e8"
    });

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection