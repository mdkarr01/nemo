const Post = require('../models/post');
const Review = require('../models/review');


module.exports = {
	// Reviews Create
	async reviewCreate(req, res, next) {
		// Find the post by ID
		let post = await Post.findById(req.params.id);
		//Create the Review
		// req.body.review.author = req.user._id;
		let review = await Review.create(req.body.review);
		//Assign review to post
		post.reviews.push(review);
		//Save the post
		post.save();
		req.session.success = 'Review created successfully!';
		res.redirect(`/posts/${post.id}`);
	},
	// Reviews Update
	async reviewUpdate(req, res, next) {

	},
	// Reviews Destroy
	async reviewDestroy(req, res, next) {

	}
}
