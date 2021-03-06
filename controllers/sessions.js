const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

//route for when a new session is created
sessions.get('/new', (req, res) => {
  //render the new session page
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  });
});

//create a new session by adding a user to a session and sending data when they login
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password) ){
      req.session.currentUser = foundUser;
      res.redirect('/uplifts/gallery');
    } else {
      res.send('You have entered the wrong password');
    }
  });
});

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/uplifts');
  });
});

module.exports = sessions;
