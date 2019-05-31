const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  email: String,
  image: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

ReviewSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', ReviewSchema);