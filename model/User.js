var mongoose = require('mongoose');

var Group = require('./Group');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    CallSign: {
        type: String,
        required: true,
        unique: true
    },
    Device: [{
        type: Schema.ObjectId,
        ref: 'Device'
    }],
    Group: [{
        type: Schema.ObjectId,
        ref: 'Group'
    }],
    DateCreated: {
        type: Date
    },
    DateUpdated: {
        type: Date
    }
    
});


userSchema.pre('save', function(next) {
    var self = this;
    User.find({
        CallSign: self.CallSign
    }, function(err, docs) {

        if (err) {

            console.log('in userSchema.pre Save Error');
            console.log(err);
            throw err;

        }

        if (!docs.length) {

            next();
        }
        else {
            console.log( self.CallSign + ' Call Sign already exists ');
            
            var myError = new Error("User CallSign already exists!");
            next(myError.toString());
        }
    });
});



userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.DateUpdated = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.DateCreated)
    this.DateCreated = currentDate;

  next();
});




var User = mongoose.model('User', userSchema);

module.exports = User;