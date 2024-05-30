const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* to set view engine */
app.set('view engine', 'ejs');

/* folder to be used for views */
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { pageNotFound } = require('./controllers/error404');

/* to parse body of the request and to set it inside req.body */
app.use(bodyParser.urlencoded({ extended: false }));

/* to serve static files like css or png's - by default will not accessible */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(pageNotFound);

app.listen(3000, () => {
  console.log('App started successfully');
});
