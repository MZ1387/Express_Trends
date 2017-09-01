'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);

app.listen(PORT, () => {
  console.log('EXPRESS SERVER LISTENING ON PORT:', PORT);
});

// https://www.instagram.com/oauth/authorize/?client_id=699955c8d5fd425ba38a6d0c9ae0e60f&redirect_uri=http://localhost:3000/auth/instagram/return&response_type=code
