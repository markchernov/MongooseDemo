
var express = require('express');

var router = express.Router();

var groupsMongooseDAO = require('../dao/groupsMongooseDAO');




/************************************************
         Groups with Mongoose in test database
**************************************************/


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    
  console.log('In Groups Route,  Time: ', new Date());
  next();
});



router.get('/:GRName', function(req, res) {

  console.log('inside GET /groups/:GRName');
  console.log('req.params.id:  ');
  console.log(req.params.GRName);


  var groupParam = req.params.GRName;

  groupsMongooseDAO.findGroupById(groupParam, function(obj) {

    console.log('returned object after groupsMongoose.findGroupById');
    console.log(obj);
    res.send(obj);
  });
});


router.get('/', function(req, res) {

  console.log('inside GET /groups');


  groupsMongooseDAO.findAllGroups(function(obj) {

    console.log('returned object after usersMongoose.findAllUsers');
    console.log(obj);
    res.send(obj);
  });
});




router.post('/', function(req, res) {
  console.log('inside POST /groups');
  console.log('req.body    ');
  console.log(req.body);


  var newGroup = {
    GRName: req.body.GRName,
    GRDesc: req.body.GRDesc,
    DATE: new Date()

  };

  groupsMongooseDAO.saveGroup(newGroup, function(obj) {

    console.log('returned object after quotesDAO.getAllGroups');
    console.log(obj);
    res.send(obj);

  });
});


router.put('/:GRName', function(req, res) {

  console.log('inside PUT /groups/:GRName');
  console.log('req.params.GRName:  ');
  console.log(req.params.GRName);
  
  console.log('req.body    ');
  console.log(req.body);

   var updateGroup = {
    GRName: req.body.GRName,
    GRDesc: req.body.GRDesc
  };



  var groupParam = req.params.GRName;

  groupsMongooseDAO.updateGroupById(groupParam, updateGroup,  function(obj) {

    console.log('returned object after groupsMongoose.updateGroupById');
    console.log(obj);
    res.send(obj);
  });
});


router.delete('/:GRName', function(req, res) {

  console.log('inside /groups/:GRName');
  console.log('req.params.GRName:  ');
  console.log(req.params.GRName);


  var groupParam = req.params.GRName;

  groupsMongooseDAO.deleteGroupById(groupParam, function(obj) {

    console.log('returned object after groupsMongoose.deleteGroupById');
    console.log(obj);
    res.send(obj);
  });
});







module.exports = router;