const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing } = require('../middleware');
const listingController = require('../controllers/listings');

const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

// search post route
router.post('/search', wrapAsync(listingController.searchListings));

// ## Index(Home) GET Route
router.get('/', wrapAsync(listingController.index));

// ## About page GET route
router.get('/about', listingController.aboutPage);

// ## Privacy page GET route
router.get('/privacy',listingController.privacyPage);

// ## Terms page GET route
router.get('/terms', listingController.termsandconditionPage);

// ## Create new Listing GET Route
router.get('/new', isLoggedIn, listingController.newListingForm);

// ## Create new Listing POST Route
router.post('/', isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));

// ## Edit Listing GET Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// ## Edit(Update) Listing POST Route
router.put('/:id', isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing));

// ## Delete Listing DELETE Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// ## Show Listing GET Route
router.get('/:id', wrapAsync(listingController.showingListing));



module.exports = router;