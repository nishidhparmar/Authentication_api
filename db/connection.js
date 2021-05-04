const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NISHIDH:NISHIDH@angularauthentication.iuxzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});