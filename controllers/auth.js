const bcryptjs = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // console.log(req.session);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.sesssion?.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('66842b1d27f84173e4eb9622')
    .then((user) => {
      console.log('came inside post login');
      req.session.isLoggedIn = true;
      // Todo
      // req.session.user = user;
      req.session.user = { email: user.email, name: user.name }; //, _id: user._id };
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'signup',
    isAuthenticated: req.sesssion?.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      console.log('User already exists');
      return res.redirect('/signup');
    }

    return bcryptjs
      .hash(password, 12)
      .then((encryptedPassword) => {
        const user = new User({
          email,
          password: encryptedPassword,
          cart: { items: [] },
        });
        return user.save();
      })
      .then((result) => {
        res.redirect('/login');
      });
  });
};
