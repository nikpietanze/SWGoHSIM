const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Matches the Username to an Account

    // Converts the entered username to lowercase to match the database format
    username.toLowerCase();

    // Queries the username for a match to the database
    let query = {username:username};
    Account.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Matches the Password to an Account
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
      done(err, user);
    });
  });
}