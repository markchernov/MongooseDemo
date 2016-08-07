//var mongoose = require('mongoose');
var Device = require('../model/Device');

var devicesMongooseDAO = {

    findDeviceById: function(deviceParam, callback) {


        console.log('inside findDeviceById');
        console.log('DeviceParam');
        console.log(deviceParam);

        Device.findOne({
            UserID: deviceParam
        }, function(err, DeviceObj) {
            if (err) {
                console.log('in Device.findOne Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (DeviceObj) {
                console.log('Device Found:', DeviceObj);
                callback(DeviceObj);

            }
            else {
                console.log('Device not found!');
                callback([{
                    message: "No Device Found"
                }]);

            }
        });

    },

    findAllDevices: function(callback) {

        console.log('inside findAllDevices');


        Device.find({}, function(err, DeviceObjs) {
            if (err) {
                console.log('in Device.find Error');
                console.log(err);
                callback({
                    'myError': err
                });

            }
            else if (DeviceObjs) {
                console.log('All Devicess Found:', DeviceObjs);
                callback(DeviceObjs);

            }
            else {
                console.log('Device not found!');
                callback([{
                    message: "No Devices Found"
                }]);

            }
        });

    },





    saveDevice: function(DeviceObject, callback) {

        console.log('inside saveDevicep');
        console.log('DeviceObject');
        console.log(DeviceObject);



        var newDevice = new Device({
            MAC: DeviceObject.MAC,
            Name: DeviceObject.Name,
            Desc: DeviceObject.Desc
        });


        if (newDevice) {

            console.log('This is my newDevice');
            console.log(newDevice);

        }

        newDevice.save(function(err, DeviceObj) {

            if (err) {
                console.log('in newDevice.save Error');
                console.log(err);
                callback({
                    'Can not save new Device': err
                });

            }
            else {
                console.log('saved successfully:', DeviceObj);
                callback(DeviceObj);

            }
        });

    },

    updateDeviceById: function(MAC, DeviceObject, callback) {


        console.log('inside updateDeviceById');
        console.log('MAC');
        console.log(MAC);

        console.log('DeviceObject');
        console.log(DeviceObject);


        Device.findOneAndUpdate({
                MAC: MAC
            },

            {
                $set: {

                    Name: DeviceObject.Name,
                    Desc: DeviceObject.Desc

                }
            }, {
                upsert: true
            },
            function(err, DeviceObj) {
                if (err) {
                    console.log('in Device.findOneAndUpdate Error');
                    console.log(err);
                    callback({
                        'myError': err
                    });
                }
                else if (DeviceObj) {
                    console.log('Device Found:', DeviceObj);
                    callback(DeviceObj);

                }
                else {
                    console.log('Device not found!');
                    callback([{
                        message: "No Device Found"
                    }]);

                }


            } // end callback

        ); // end findAndUpdateUser

    }, // end updateUserById


    deleteDeviceById: function(MAC, callback) {


            console.log('inside deleteGroupById');
            console.log('MAC');
            console.log(MAC);

            Device.findOneAndRemove({
                    MAC: MAC
                },
                function(err, DeviceObj) {
                    if (err) {
                        console.log('in Device.findOneAndRemove Error');
                        console.log(err);
                        callback({
                            'myError': err
                        });

                    }
                    else if (DeviceObj) {
                        console.log('Device Found:', DeviceObj);
                        callback(DeviceObj);

                    }
                    else {
                        console.log('Device not found!');
                        callback([{
                            message: "No Device Found"
                        }]);

                    }


                } // end callback

            ); // end findOneAndRemove

        } // end deleteUserById


}; // end var usersMongooseDAO




module.exports = devicesMongooseDAO;