var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deviceSchema = new Schema({
    MAC: {
        type: String,
        required: true,
        unique: true
    },
    Name: String,
    Desc: String,
    DateCreated: {
        type: Date
    },
    DateUpdated: {
        type: Date
    }
});


deviceSchema.pre('save', function(next) {
    var self = this;
    Device.find({
        MAC: self.MAC
    }, function(err, docs) {

        if (err) {

            console.log('in deviceSchema.pre Save Error');
            console.log(err);
            throw err;

        }

        if (!docs.length) {

            next();
        }
        else {
            console.log( self.MAC + ' Call Sign already exists ');
            var myError = new Error("Device with MAC: "  + self.MAC + " already exists!");
            next(myError.toString());
        }
    });
});



deviceSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.DateUpdated = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.DateCreated)
    this.DateCreated = currentDate;

  next();
});






var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;