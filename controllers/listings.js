const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

// ## Index(Home) Route GET request
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings, title: "StayVista - Home" });
}

// ## Create new Listing GET Route
module.exports.newListingForm = (req, res) => {
    try {
        res.render('listings/new', { title: "StayVista - Create New Listing" });
    } catch (err) {
        console.error(err); // for development purpose
        res.status(500).render('error', { message: "Internal Server !" });
    }
}

// ## Create new Listing POST Route
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let listing = req.body.listing;
    let newListing = new Listing(listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    req.flash('success', "Your new listing has been created!");
    res.redirect('/listings');
}

// ## Edit Listing GET Route
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', "The listing you requested does not exist.");
        return res.redirect('/listings');
    }
    res.render('listings/edit', { listing, title: "StayVista - Edit Listing" });
}

// ## Edit(Update) Listing POST Route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash('success', "Your Listing was updated successfully!");
    res.redirect(`/listings/${id}`);
}

// ## Delete Listing DELETE Route
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', "Your listing has been successfully deleted.");
    res.redirect('/listings');
}

// ## Show Listing GET Route
module.exports.showingListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash('error', "The listing you requested does not exist.");
        return res.redirect('/listings');
    }

    res.render('listings/show', { listing, title: "StayVista - Listing details" });
}

// ## search bar post route
module.exports.searchListings = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm;

        const filterListings = await Listing.find(
            { $text: { $search: searchTerm } }
        );
        // console.log(filterListings);

        res.render('search', {
            filterListings,
            title: "StayVista - Search listings",
            message: filterListings.length === 0 ? "No listings found." : ""
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "An error occurred while searching." });
    }
};


// ## About page :
module.exports.aboutPage = (req, res, next) => {
    try {
        res.render('listings/about', { title: "StayVista - About" });
    } catch (error) {
        next(new ExpressError(500, "An error occurred!"));
    }
}

// ## Privacy Page:
module.exports.privacyPage = (req, res, next) => {
    try {
        res.render('listings/privacy', { title: "StayVista - Privacy" });
    } catch (error) {
        next(new ExpressError(500, "An error occurred!"));
    }
}

// ## Terms and condition page:
module.exports.termsandconditionPage = (req, res, next) => {
    try {
        res.render('listings/termsandcondition', { title: "StayVista - Terms & Conditions" });
    } catch (error) {
        next(new ExpressError(500, "An error occurred!"));
    }
}


