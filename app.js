/************************************************
 
APP CONFIG

**************************************************/

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());


app.listen(process.env.PORT);
console.log('Example app listening on port: ' + process.env.PORT);
console.log('Example app IP: ' + process.env.IP);


// allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



/************************************************
 
MONGO DB Connection

**************************************************/

mongoose.connect('mongodb://localhost/test');

/*app.use(function(req,res,next) {
  
  mongoose.connect('mongodb://localhost/test');
 
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('DB initialised successfully');
    app.locals.db = db;
  });
  next();
});*/




/************************************************
 
ROUTES

**************************************************/


var groups = require('./routes/Groups');

app.use('/groups', groups);



var users = require('./routes/Users');

app.use('/users', users);


var devices = require('./routes/Devices');

app.use('/devices', devices);



/************************************************
                      Ping
**************************************************/


app.get('/', function(req, res) {

  res.json({
    test: 'My Node.js Test API. Hit /users, /groups or /devices route'
  });

});


/************************************************
                      Responses
**************************************************/




app.use(function(req, res, next) {

  res.status(404).send('Sorry can not find it');

});


module.exports = app;