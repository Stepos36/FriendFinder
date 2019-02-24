var mysql = require("mysql")
    PORT = process.env.PORT || 8080;
    connection = mysql.createConnection({
      host: "us-cdbr-iron-east-03.cleardb.net",
      port: 3306,
      user: "b88c3be95b06d2",
      password: "dce6caad",
      database: "heroku_8cbe70c838925e8"
    });

handleDisconnect()
console.log("connected as id " + connection.threadId);

module.exports = connection

function handleDisconnect() {
  connection.connect(function(err) {
    if(err) {
      console.error("error connecting: " + err);
      setTimeout(handleDisconnect, 2000);
      }
  });
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
