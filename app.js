var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var routes = require('./routes/routes');
var port = process.env.PORT || 8000;
var app = express();

mongoose.connect(config.connectionString);

app.get('/', function(req, res){
  res.send("Bem vindo a minha API!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(port, function(){
  console.log("Server start in port: " + port);
})

module.exports = app;
