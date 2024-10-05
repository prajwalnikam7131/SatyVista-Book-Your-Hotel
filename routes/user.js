const express = require('express');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');

const userController = require('../controllers/users');

// ## signup GET Route Request
router.get('/signup', userController.renderSignup);

// ## signup POST Route Request
router.post('/signup', wrapAsync(userController.signup));

// ## login GET Route Request
router.get('/login', userController.renderLogin);

// ## login POST Route Request
router.post('/login', saveRedirectUrl, passport.authenticate('local',
    { failureRedirect: '/login', failureFlash: true }), userController.login);

// ## logout GET Route Request
router.get('/logout', userController.logout);

module.exports = router;