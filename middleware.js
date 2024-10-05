const { listingSchema, reviewSchema } = require('./schema');
const Listing = require('./models/listing');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');


// ## isLoggedIn middleware
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user); // checking purpose

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', "You need to be logged in to create a listing.");
        return res.redirect('/login');
    }
    next();
}

// ## to improve a user experience
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// ## to check current user is a listing owner or not.
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash('error', "Only the owner can make changes to this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// ## to check current user is a review owner or not.
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash('error', "Only the owner can make changes to this listing review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// ## Listing validation
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.error(error); // development purpose
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// ## Review validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.error(error); // development purpose
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}
