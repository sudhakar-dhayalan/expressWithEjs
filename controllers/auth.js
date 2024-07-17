const BSON = require('bson');
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
      req.session.user = { email: user.email, name: user.name }//, _id: user._id };
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      })
      // req.session.user = user;
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
