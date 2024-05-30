const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* to set view engine */
app.set('view engine', 'ejs');

/* folder to be used for views */
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* to parse body of the request and to set it inside req.body */
app.use(bodyParser.urlencoded({ extended: false }));

/* to serve static files like css or png's - by default will not accessible */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});


app.listen(3000, () => {
  console.log('App started successfully')
});
