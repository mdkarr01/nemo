const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "michael-karr",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  //Posts Index
  async postIndex(req, res, next) {
    let posts = await Post.find({});
    res.render('posts/index', {
      posts
    });
  },
  //Post New
  postNew(req, res, next) {
    res.render('posts/new');
  },
  //Post Create
  async postCreate(req, res, next) {
    req.body.post.images = [];
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id
      });
    }
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },
  //Post Show
  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render('posts/show', {
      post
    });
  },
  //Post Edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render(`posts/edit`, {
      post
    });
  },
  //Post Update
  async postUpdate(req, res, next) {
    //Find post by id
    let post = await Post.findByIdAndUpdate(req.params.id);
    //check if any images for deletion
    if (req.body.image.length <= 4) {

    }
    res.redirect(`/posts/${post.id}`);
  },
  //Post Destroy
  async postDestroy(req, res, next) {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/posts');
  }
}