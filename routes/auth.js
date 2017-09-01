'use strict';

const passport = require('passport');

module.exports = (app) => {

  app.get('/auth/login/instagram',
  passport.authenticate('instagram'));

  app.get('/auth/instagram/return',
    passport.authenticate('instagram', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};
