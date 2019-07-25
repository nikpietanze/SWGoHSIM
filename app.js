const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database')

// Connects mongoose to the API - You could sub out localhost for a URL for API calls
mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for database errors
db.on('error', (err) => {
  console.log(err);
});

// Initialize the App
const app = express();

// Brings in Models
let Account = require('./models/account');

// Load the View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder for Assets
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Connect-Flash Middleware
app.use(flash());

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Brings in the Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})

// Home Route
app.get('/', (req, res) => {
  res.render('index')
});

// Route Files
// Create Account & Login Pages & gives them the /profile prefix
let accounts = require('./routes/accounts');
app.use('/profile', accounts);

// Profile Page
let profile = require('./routes/profile');
app.use(profile);

// Sim Page
let sim = require('./routes/sim');
app.use(sim);

// Mod Planner Page
let modPlanner = require('./routes/planner');
app.use(modPlanner);

// Arena & Raid Leaderboards & gives them the /leaderboard prefix
let leaderboards = require('./routes/leaderboards');
app.use('/leaderboard', leaderboards);


// API Call to the Profile Account List
app.get('/api/accounts', (req, res) => {
  Account.find({}, (err, accounts) => {
    if(err) {
      console.log(err);
    } else {
      res.render('apiAccounts', {
        title: 'Accounts',
        accounts:accounts
      });
    }
  });
});

// Starts the server
app.listen(3000, () => {
  console.log(`Server started on port 3000`)
});