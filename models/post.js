const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  email: String,
  image: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

PostSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Post', PostSchema);