'use strict';

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('Home Page');
  });

};
