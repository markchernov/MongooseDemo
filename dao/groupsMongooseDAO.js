//var mongoose = require('mongoose');
var Group = require('../model/Group');

var groupsMongooseDAO = {

    findGroupById: function(groupParam, callback) {


        console.log('inside findGroupById');
        console.log('groupParam');
        console.log(groupParam);


        Group.findOne({
            UserID: groupParam
        }, function(err, groupObj) {
            if (err) {
                console.log('in Group.findOne Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (groupObj) {
                console.log('Group Found:', groupObj);
                callback(groupObj);

            }
            else {
                console.log('Group not found!');
                callback([{
                    message: "No Group Found"
                }]);

            }
        });

    },

    findAllGroups: function(callback) {

        console.log('inside findAllGroups');

        Group.find({}, function(err, groupObjs) {
            if (err) {
                console.log('in Group.find Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (groupObjs) {
                console.log('All Groups Found:', groupObjs);
                callback(groupObjs);

            }
            else {
                console.log('Groups not found!');
                callback([{
                    message: "No Groupss Found"
                }]);

            }
        });

    },





    saveGroup: function(groupObject, callback) {

        console.log('inside saveGroup');
        console.log('groupObject');
        console.log(groupObject);

        var newGroup = new Group({
            GRName: groupObject.GRName,
            GRDesc: groupObject.GRDesc,
        });


        if (newGroup) {

            console.log('This is my newGroup');
            console.log(newGroup);

        }

        newGroup.save(function(err, groupObj) {

            if (err) {
                console.log('in newGroup.save Error');
                console.log(err);
                callback({
                    'Can not save new Group': err
                });

            }
            else {
                console.log('saved successfully:', groupObj);
                callback(groupObj);

            }
        });

    },

    updateGroupById: function(groupParam, groupObject, callback) {


        console.log('inside updateGroupById');
        console.log('groupParam');
        console.log(groupParam);

        console.log('groupObject');
        console.log(groupObject);


        Group.findOneAndUpdate({
                GRName: groupParam
            },

            {
                $set: {
                    GRDesc: groupObject.GRDesc
                }
            }, {
                upsert: true
            },
            function(err, groupObj) {
                if (err) {
                    console.log('in Group.findOneAndUpdate Error');
                    console.log(err);
                    callback({
                        'myError': err
                    });

                }
                else if (groupObj) {
                    console.log('Group Found:', groupObj);
                    callback(groupObj);

                }
                else {
                    console.log('Group not found!');
                    callback([{
                        message: "No Group Found"
                    }]);

                }


            } // end callback

        ); // end findAndUpdateUser

    }, // end updateUserById


    deleteGroupById: function(groupParam, callback) {


            console.log('inside deleteGroupById');
            console.log('groupParam');
            console.log(groupParam);

            Group.findOneAndRemove({
                    GRName: groupParam
                },
                function(err, groupObj) {
                    if (err) {
                        console.log('in Group.findOneAndRemove Error');
                        console.log(err);
                        callback({
                            'myError': err
                        });

                    }
                    else if (groupObj) {
                        console.log('Group Found:', groupObj);
                        callback(groupObj);

                    }
                    else {
                        console.log('Group not found!');
                        callback([{
                            message: "No Group Found"
                        }]);

                    }


                } // end callback

            ); // end findOneAndRemove

        } // end deleteUserById


}; // end var usersMongooseDAO




module.exports = groupsMongooseDAO;