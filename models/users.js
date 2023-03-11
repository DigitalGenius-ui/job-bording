const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {type: String},
  email: {type:String, required: true, unique: true},
  password: {type: String, required: true},
  signupAs: {type: String}
}, {collection: 'users'});

const model = mongoose.model('users', userSchema);

module.exports = model;