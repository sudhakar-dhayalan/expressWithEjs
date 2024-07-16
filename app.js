const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(
  session({
    secret: 'Any string can be added, these will be encrypted',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('66842b1d27f84173e4eb9622')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://sudhakardayalan95:testQwerty@cluster0.utlkld4.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then((result) => {
    User.find().then((user) => {
      if (!user) {
        const user = new User({
          name: 'RandomPerson',
          email: 'random@gmail.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log('Connected');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
