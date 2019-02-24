var express = require("express");
    exphbs = require("express-handlebars");
    path = require("path");
    app = express();
    bodyParser = require("body-parser");
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

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);
require('./config/connection.js')


