const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view-engine', 'ejs');
app.set('views', 'views');

// to serve static files like css or png's - by default will not accessible
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get('/', (req, res) => {
  res.render('user-form.ejs', {
    pageTitle: 'UserForm Page'
  });
});

app.get('/users', (req, res) => {
  res.render('users.ejs', {
    pageTitle: 'Users',
    users: users,
  });
})

app.post('/users', (req, res) => {
  console.log('Post call');
  users.push({ userName: req.body.userName});
  res.redirect('/users')
})

app.listen(3000, () => {
  console.log('App started successfully')
});
