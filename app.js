if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

// connections
const port = 8080;
const db = require('./config/mongooseConnection');

// libraries
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// models
const Listing = require('./models/listing');
const Review = require('./models/review');
const User = require('./models/user');

// Import Routes
const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');

// handling Error
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const { now } = require('mongoose');

// static file
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// common middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Template engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// Mongo Session store:
const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    crypto: {
        secret: process.env.MONGO_SECRET,
    },
    touchAfter: 24 * 3600
});

// express session
app.use(session({
    store: store, // For simplicity, you can directly write 'store'.
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));
app.use(flash());

// Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash message local storage
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

// main routes
app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
})

// error handling
app.use((err, req, res, next) => {
    // console.log(err); // development purpose

    let { status = 500, message = "something went wrong !" } = err;
    // res.status(status).send(message);
    res.status(status).render('error', { message, title: "error" });
})

app.listen(port, (req, res) => {
    console.log(`server is listening...`);
})
