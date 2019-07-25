const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const request = require("request");

// Bring in the Account model
let Account = require('../models/account');

// Register Form directing to /profile/create and using the view createProfile
router.get('/create', (req, res) => {
  res.render('createProfile');
});

// Registration Proccess
router.post('/create', (req, res) => {
  let username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const playerID = req.body.playerID;
  let agreement = req.body.agreement;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password is not long enough').isLength(5);
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('playerID', 'PlayerID is required').notEmpty();
  req.checkBody('playerID', 'PlayerID is invalid').isLength(22);
  req.checkBody('agreement', 'PlayerID agreement is required').notEmpty();

  // Get Errors if there are any
  const errors = req.validationErrors();

  if(errors) {
    res.render('createProfile', {
      errors:errors
    });
  } else {
    // Recognizes that the PlayerID agreement was checked
    agreement = true;

    // Assigns the entered username as a displayName to reuse on the site
    const displayName = username;

    // Converts the entered username to lowercase for login efficiency
    username = username.toLowerCase();

    // Assembles new account data
    let newAccount = new Account({
      displayName:displayName,
      username:username,
      password:password,
      playerID:playerID,
      agreement:agreement
    });

    // Creates password encryption
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAccount.password, salt, (err, hash) => {
        if(err) {
          console.log(err);
        }
        newAccount.password = hash;
        newAccount.save((err) => {
          if(err) {
            console.log(err);
            return;
          } else {
            req.flash('success', 'Profile has been successfully created! Please log in.');
            res.redirect('/profile/login');
          }
        })
      });
    })
  }
});

// Gets Bearer Token
let options = { method: 'POST',
  url: 'https://api.swgoh.help/auth/signin',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'content-length': '94',
     'accept-encoding': 'gzip, deflate',
     cookie: 'connect.sid=s%3Av4qDqnPWB_Ws1BL-UJ-HlygzzSEYt0SK.NqY9FL6Yit4Sec8f2zWVPSltcUBpwBybiX2C9nB33pE',
     Host: 'api.swgoh.help',
     'Postman-Token': '35e2d7fc-be65-441f-8d7b-935a13c5c7ea,604a8027-a3ce-483f-81cf-12ea8a7bbcd6',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.13.0',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: 
   { username: 'KinPie',
     password: 'swgohsim098',
     grant_type: 'password',
     client_id: 'swgohsim',
     client_secret: 'nico' }
};

// Initializes the bearer token variable
let token = ''

// Sends the API request for the bearer token
request(options, (err, res, body) => {
  if (err) throw new Error(err);
  let data = JSON.parse(body);
  token += data.access_token;
});

// Pulls Player Data
let playerData = () => {
  // Pulls the players data
  options = { 
    method: 'POST',
    url: 'https://api.swgoh.help/swgoh/players',
    qs: { allycodes: '897227329' },
    headers: { 
      'Postman-Token': '68b9b2a1-6a65-46f7-a48b-2507c269930d',
      'cache-control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token
    },
    form: { 
      username: 'KinPie',
      password: 'swgohsim098',
      grant_type: 'password',
      client_id: 'swgohsim',
      client_secret: 'nico'
    }
  };

  // Sends the request for player data
  request(options, function (err, res, body) {
    if (err) throw new Error(err);
    console.log(`Player Data = ${body}`);
  });
};

// Pulls Player Guild Data
let playerGuildData = () => {
  options = {
    method: 'POST',
    url: 'https://api.swgoh.help/swgoh/guilds',
    qs: { allycodes: '897227329' },
    headers: {
      'Postman-Token': 'c235189f-fb8c-42ad-ac22-fe9a6e3a03f8',
      'cache-control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token
    },
    form: {
      username: 'KinPie',
      password: 'swgohsim098',
      grant_type: 'password',
      client_id: 'swgohsim',
      client_secret: 'nico'
    }
  };

  // Sends the request for the player's guild data
  request(options, function (err, res, body) {
    if (err) throw new Error(err);
    console.log(`Guild Data = ${body}`);
  });
}

// Combines the data request functions to grab data simutaneously
const pData = () => {
  playerData();
  playerGuildData();
}

// Sets a timeout for the initial bearer token request
setTimeout(pData, 1500)

// Assigns the Profile Login Route
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/profile/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Process
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/')
});

module.exports = router;