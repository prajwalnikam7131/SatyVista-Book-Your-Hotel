const User = require('../models/user');

// ## signup GET Route Request
module.exports.renderSignup = (req, res) => {
    try {
        res.render('users/signup', { title: "StayVista - Signup" });
    } catch (err) {
        req.flash('error', "Internal server error !");
        res.redirect('/listings');
    }
}

// ## signup POST Route Request
module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        
        // ## login after signup
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash('success', 'Awesome! Your account is now ready to use.');
            return res.redirect('/listings');
        })

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
}

// ## login GET Route Request
module.exports.renderLogin = (req, res) => {
    res.render('users/login', { title: "StayVista - Login" });
}

// ## login POST Route Request
module.exports.login = async (req, res) => {
    req.flash('success', "Welcome back to StayVista! We're glad to have you with us again!");
    res.redirect(res.locals.redirectUrl || '/listings');
}

// ## logout GET Route Request
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "Your session has been closed safely. See you next time!");
        res.redirect('/listings');
    })
}