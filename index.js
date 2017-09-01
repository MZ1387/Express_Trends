var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();
const keys = require('./config/keys');

// app.configure(function() {
//   // The usual...
// });

api.use({
  client_id: keys.instagramClientID,
  client_secret: keys.instagramClientSecret
});

var redirect_uri = 'http://localhost:3000/auth/instagram/return';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['basic','public_content', 'follower_list', 'comments', 'relationships', 'likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    console.log('------------------------------------------');
    console.log('USER RESULT');
    console.log('------------------------------------------');
    console.log(result);
    console.log('------------------------------------------');
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/auth/instagram/return', exports.handleauth);

app.get('/test', function(req, res) {
  ig.tag('tag', function(err, result, remaining, limit) {
    console.log('------------------------------------------');
    console.log('ERROR');
    console.log('------------------------------------------');
    console.log(err);
    console.log('------------------------------------------');
    console.log('RESULT');
    console.log('------------------------------------------');
    console.log(result);
    console.log('------------------------------------------');
    console.log('REMAINING');
    console.log('------------------------------------------');
    console.log(remaining);
    console.log('------------------------------------------');
    console.log('LIMIT');
    console.log('------------------------------------------');
    console.log(limit);
    console.log('------------------------------------------');
  });
})

const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, function(){
  console.log("Express server listening on port " + PORT);
});
