const Post = require('../models/post');
const Review = require('../models/review');


module.exports = {
	// Reviews Create
	async reviewCreate(req, res, next) {
		// Find the post by ID
		let post = await Post.findById(req.params.id);
		//Create the Review
		req.body.review.author = req.user._id;
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
		let review = await Review.findById(req.params.id);
		post.review.body = req.body.review.body;
		post.review.rating = req.body.review.rating;
		// save the updated post into the db
		post.save();
		// redirect to show page
		res.redirect(`/posts/${post.id}`);
	},
	// Reviews Destroy
	async reviewDestroy(req, res, next) {
		let review = await Review.findById(req.params.id);
		await review.remove();
		res.redirect('/posts');
	}
}

