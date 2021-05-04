const mongoose = require('mongoose');

const User = mongoose.model('user', { email:String, password:String });

module.exports = User