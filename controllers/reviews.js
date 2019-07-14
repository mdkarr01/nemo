const Post = require("../models/post");
const Review = require("../models/review");

module.exports = {
  // Reviews Create
  async reviewCreate(req, res, next) {
    // Find the post by ID
    let post = await Post.findById(req.params.id);
    //   .populate("reviews")
    //   .exec();
    // let haveReviewed = post.reviews.filter(review => {
    //   return review.author.equals(req.user._id);
    // }).length;
    // if (haveReviewed) {
    //   req.session.error = "You may only create one review per post";
    //   return res.redirect(`/posts/${post.id}`);
    // }
    //Create the Review
    req.body.review.author = req.user._id;
    let review = await Review.create(req.body.review);
    //Assign review to post
    post.reviews.push(review);
    //Save the post
    post.save();
    req.session.success = "Review created successfully!";
    res.redirect(`/posts/${post.id}`);
  },
  // Reviews Update
  async reviewUpdate(req, res, next) {
    await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
    req.session.success = "Review successfully updated";
    // redirect to show page
    res.redirect(`/posts/${req.params.id}`);
  },
  // Reviews Destroy
  async reviewDestroy(req, res, next) {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.review_id }
    });
    await Review.findByIdAndRemove(req.params.review_id);
    req.session.success = "Review successfully removed";
    res.redirect(`/posts/${req.params.id}`);
  }
};
