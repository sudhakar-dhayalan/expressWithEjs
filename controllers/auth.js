const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '',
    },
  })
);

exports.getLogin = (req, res, next) => {
  // console.log(req.session);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    // User.findById('66842b1d27f84173e4eb9622')
    .then((existingUser) => {
      console.log('came inside post login');

      if (!existingUser) {
        return res.redirect('/login');
      }

      bcryptjs
        .compare(password, existingUser.password)
        .then((isPasswordMatching) => {
          if (isPasswordMatching) {
            req.session.isLoggedIn = true;
            // Todo
            // req.session.user = existingUser;
            req.session.user = { email: existingUser.email }; //, _id: user._id };
            req.session.save((err) => {
              console.log(err);
              return res.redirect('/');
            });
          } else {
            return res.redirect('/login');
          }
        })
        .catch((err) => {
          console.log(err);
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
        return transporter.sendMail({
          to: email,
          from: 'shop@nodewithexpress.com',
          subject: 'Testing',
          html: '<h1>Successfully signed up',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
