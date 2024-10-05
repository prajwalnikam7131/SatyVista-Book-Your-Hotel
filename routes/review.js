const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewController = require('../controllers/reviews');


// ## Reviews POST request
router.post('/', validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// ## Review DELETE requsest
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;