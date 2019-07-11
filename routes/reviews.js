const express = require('express');
const router = express.Router({
  mergeParams: true
});
const {
  reviewCreate,
  reviewUpdate,
  reviewDestroy
} = require('../controllers/reviews');
const {
  asyncErrorHandler
} = require('../middleware');

/* POST reviews create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT reviews update /posts/:id/reviews/:review_id  */
router.put('/:review_id', asyncErrorHandler(reviewUpdate));

/* DELETE reviews destroy /posts/:id/reviews/:review_id  */
router.delete('/:review_id', asyncErrorHandler(reviewDestroy));

module.exports = router;