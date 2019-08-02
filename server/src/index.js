const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const databse = require('./database');
const config = require('./headerConfig');
const jwtUtilities = require('./jwtUtilities');

const PORT = process.env.PORT || 3001;
const app = express();

// To be abele to parse API requests with body variables
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Fixes the Cannot GET error when refreshing on a path
app.use(history());

app.use(config.headerConfig);

// Account handling
app.post('/sign-in', databse.signIn);
app.post('/create-account', databse.createAccount);
app.post('/valid-token', jwtUtilities.checkToken);

// Create a specific router with the prefix /api to use with all api requests
const router = express.Router();
app.use('/api', router);
// No authentication
router.get('/get-blogposts', databse.getBlogposts);
router.get('/get-blogpost', databse.getBlogpost);

//! These api requests require authentication! use checkToken middleware
//router.use(jwtUtilities.checkToken); //? This doesn't work for some reason
router.post('/add-blogpost', jwtUtilities.checkToken, databse.addBlogpost);
router.put('/update-blogpost', jwtUtilities.checkToken, databse.updateBlogpost);
router.delete('/remove-blogpost', jwtUtilities.checkToken, databse.removeBlogpost);
router.delete('/purge-blogposts', jwtUtilities.checkToken, databse.purgeBlogposts);

//? GET     - Get data
//? POST    - Create data
//? DELETE  - Delete data
//? PUT     - Update data

// Serve static front-end content when in production
if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION MODE ENGAGED');
  var staticPath = path.join(__dirname, '../build');
  console.log(staticPath);
  app.use(express.static(staticPath));
}

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT + ' :D');
});
