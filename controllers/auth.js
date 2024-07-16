exports.getLogin = (req, res, next) => {
  console.log(req.session)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.sesssion?.isLoggedIn,
  })
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // console.log(req.session)
  res.redirect('/');
};