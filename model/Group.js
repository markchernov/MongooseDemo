var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    GRName: {
        type: String,
        required: true,
        unique: true
    },
    GRDesc: String,
    DateCreated: {
        type: Date
    },
    DateUpdated: {
        type: Date
    }
});


groupSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.DateUpdated = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.DateCreated)
    this.DateCreated = currentDate;

  next();
});










var Group = mongoose.model('Group', groupSchema);

module.exports = Group;