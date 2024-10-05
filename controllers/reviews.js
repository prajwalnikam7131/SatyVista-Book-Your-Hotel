const Listing = require('../models/listing');
const Review = require('../models/review');


// ## Reviews POST request
module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;  // adding author

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash('success', "Your new review has been created!");
    res.redirect(`/listings/${id}`);
}

// ## Review DELETE requsest
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', "Your review has been successfully deleted.");
    res.redirect(`/listings/${id}`);
}