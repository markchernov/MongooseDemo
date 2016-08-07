var express = require('express');

var router = express.Router();

var devicesMongooseDAO = require('../dao/devicesMongooseDAO');




/************************************************
         Devices with Mongoose in test database
**************************************************/


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('In Devices Route,  Time: ', new Date());
  next();
});




router.get('/:MAC', function(req, res) {

  console.log('inside GET /devices/:MAC');
  console.log('req.params.MAC:  ');
  console.log(req.params.MAC);


  var deviceParam = req.params.MAC;

  devicesMongooseDAO.findGroupById(deviceParam, function(obj) {

    console.log('returned object after devicesMongoose.findDeviceById');
    console.log(obj);
    res.send(obj);
  });
});


router.get('/', function(req, res) {

  console.log('inside GET /devices');


  devicesMongooseDAO.findAllDevices(function(obj) {

    console.log('returned object after devicesMongoose.findAllDevices');
    console.log(obj);
    res.send(obj);
  });
});




router.post('/', function(req, res) {
  console.log('inside POST /devices');
  console.log('req.body    ');
  console.log(req.body);


  var newDevice = {
    MAC: req.body.MAC,
    Name: req.body.Name,
    Desc: req.body.Desc,
    DATE: new Date()

  };

  devicesMongooseDAO.saveDevice(newDevice, function(obj) {

    console.log('returned object after devicesMOngooseDAO.getAllDevices');
    console.log(obj);
    res.send(obj);

  });
});


router.put('/:MAC', function(req, res) {

  console.log('inside PUT /devices/:MAC');
  console.log('req.params.MAC:  ');
  console.log(req.params.MAC);
  
  console.log('req.body    ');
  console.log(req.body);

   var updateDevice = {
   
    Name: req.body.Name,
    Desc: req.body.Desc
  };



  var deviceParam = req.params.MAC;

  devicesMongooseDAO.updateDeviceById(deviceParam, updateDevice,  function(obj) {

    console.log('returned object after devicesMongoose.updateDeviceById');
    console.log(obj);
    res.send(obj);
  });
});


router.delete('/:MAC', function(req, res) {

  console.log('inside /devices/:MAC');
  console.log('req.params.MAC:  ');
  console.log(req.params.MAC);


  var deviceParam = req.params.MAC;

  devicesMongooseDAO.deleteDeviceById(deviceParam, function(obj) {

    console.log('returned object after devicesMongoose.deleteDeviceById');
    console.log(obj);
    res.send(obj);
  });
});







module.exports = router;