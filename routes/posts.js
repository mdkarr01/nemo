const express = require('express');
const router = express.Router();
const {
  getPosts,
  newPost,
  createPost,
  showPost,
  editPost,
  updatePost
} = require('../controllers/posts');
const {
  asyncErrorHandler
} = require('../middleware');

/* GET posts index /posts. */
router.get('/', asyncErrorHandler(getPosts));

/* GET posts new /posts/new. */
router.get('/new', newPost);

/* POST posts create /posts */
router.post('/', asyncErrorHandler(createPost));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(showPost));

/* GET posts edit /posts/:id/edit. */
router.get('/:id/edit', asyncErrorHandler(editPost));

/* PUT posts update /posts/:id */
router.put('/:id', asyncErrorHandler(updatePost));

/* SDELETE posts destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
  res.send('DESTROY /posts:id');
});

module.exports = router;