const Post = require('../models/post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN
});
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
      posts, title: 'Posts Index'
    });
  },
  //Post New
  postNew(req, res, next) {
    res.render('posts/new', {title: "New Post"});
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
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.post.location,
        limit: 1
      })
      .send();
    req.body.post.coordinates = response.body.features[0].geometry.coordinates;
    let post = await Post.create(req.body.post);
    req.session.success = 'Post created!';
    res.redirect(`/posts/${post.id}`);
  },
  //Post Show
  async postShow(req, res, next) {
    throw new Error('Oh No!!');
    let post = await Post.findById(req.params.id);
    res.render('posts/show', {
      post, title: 'All Posts'
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
    let post = await Post.findById(req.params.id);
    //check if any images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length) {
      //assign deleteImages from req.body to its own variable
      let deleteImages = req.body.deleteImages;
      //loop over deleteImages
      for (const public_id of deleteImages) {
        //delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        //delete image from post.images
        for (const image of post.images) {
          if (image.public_id === public_id) {
            let index = post.images.indexOf(image);
            post.images.splice(index, 1);
          }
        }
      }
    }
    //check if there are any new images to upload
    if (req.files) {
      //upload files
      for (const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        //add images to post.images array
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }
    //check to see if the location has changed
    if (req.body.post.location !== post.location) {
      let response = await geocodingClient
        .forwardGeocode({
          query: req.body.post.location,
          limit: 1
        })
        .send();
      post.coordinates = response.body.features[0].geometry.coordinates;
      post.location = req.body.post.location;
    }
    //update the post with any new properties
    post.title = req.body.post.title;
    post.description = req.body.post.description;
    post.price = req.body.post.price;
    //save the updated post to the database
    post.save();
    //redirect to the show page
    res.redirect(`/posts/${post.id}`);
  },
  //Post Destroy
  async postDestroy(req, res, next) {
    let post = await Post.findById(req.params.id);
    for (const image of post.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await post.remove();
    res.redirect('/posts');
  }
}