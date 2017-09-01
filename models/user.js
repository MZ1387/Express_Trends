const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  username: String,
  photo: String,
  bio: String,
  website: String
});

mongoose.model('User', UserSchema);
