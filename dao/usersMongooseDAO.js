//var mongoose = require('mongoose');
var User = require('../model/User');

var usersMongooseDAO = {

    findUserById: function(CallSign, callback) {


        console.log('inside findUserById');
        console.log('CallSign');
        console.log(CallSign);


        User.findOne({
            CallSign: CallSign
        }, function(err, userObj) {
            if (err) {
                console.log('in User.findOne Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (userObj) {
                console.log('User Found:', userObj);
                callback(userObj);

            }
            else {
                console.log('User not found!');
                callback([{
                    message: "No User Found"
                }]);


            }
        }).populate('Group').populate('Device');




    },

    findAllUsers: function(callback) {

        console.log('inside findAllUsers');


        User.find({}, function(err, userObjs) {
            if (err) {
                console.log('in User.find Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (userObjs) {
                console.log('All Users Found:', userObjs);
                callback(userObjs);

            }
            else {
                console.log('Users not found!');
                callback([{
                    message: "No Users Found"
                }]);
            }
        }).populate('Group').populate('Device');

    },





    saveUser: function(userObject, callback) {

        console.log('inside saveUser');
        console.log('userObject');
        console.log(userObject);

        var newUser = new User({
            CallSign: userObject.CallSign,
            Device: userObject.Device,
            Group: userObject.Group

        });


        if (newUser) {

            console.log('This is my newUser');
            console.log(newUser);

        }

        newUser.save(function(err, userObj) {

            if (err) {
                console.log('in newUser.save Error');
                console.log(err);
                callback({
                    'Can not save new User': err
                });

            }
            else {
                console.log('saved successfully:', userObj);
                callback(userObj);

            }
        });

    },

    updateUserById: function(CallSign, userObject, callback) {


        console.log('inside updateUserById');
        console.log('CallSign');
        console.log(CallSign);

        console.log('userObject');
        console.log(userObject);


        console.log('userObject._id');
        console.log(userObject._id);



        User.findOneAndUpdate({
                CallSign: CallSign
            },

            {
                $set: {
                    Device: userObject.Device,
                    Group: userObject.Group
                }
            }, {
                upsert: true,
                new: true // to get the new value from User.findOneAndUpdate
            },
            function(err, userObj) {
                if (err) {
                    console.log('in User.findOneAndUpdate Error');
                    console.log(err);
                    callback({
                        'myError': err
                    });

                }
                else if (userObj) {
                    console.log('User Found:', userObj);
                    callback(userObj);

                }
                else {
                    console.log('User not found!');
                    callback([{
                        message: "No User Found"
                    }]);

                }


            } // end callback

        ); // end findAndUpdateUser

    }, // end updateUserById


    deleteUserById: function(CallSign, callback) {


            console.log('inside deleteUserById');
            console.log('CallSign');
            console.log(CallSign);


            User.findOneAndRemove({
                    CallSign: CallSign
                },
                function(err, userObj) {
                    if (err) {
                        console.log('in User.findOneAndRemove Error');
                        console.log(err);
                        callback({
                            'myError': err
                        });

                    }
                    else if (userObj) {
                        console.log('User Found:', userObj);
                        callback(userObj);

                    }
                    else {
                        console.log('User not found!');
                        callback([{
                            message: "No User Found"
                        }]);

                    }


                } // end callback

            ); // end findOneAndRemove

        } // end deleteUserById


}; // end var usersMongooseDAO




module.exports = usersMongooseDAO;