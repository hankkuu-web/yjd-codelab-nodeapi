const express = require('express');
const swaggerDoc = require('./swagger.doc');

const setupSwaggerDocument = app => {
  app.get('/doc', (req, res) => {
    swaggerDoc.host = req.headers.host;
    res.json(swaggerDoc)
  });
};

const setupSwaggerUi = app => {
  app.use('/', (req, res, next) => {
    if (req.url === '/') res.redirect('?url=/doc');
    else next();
  }, express.static('node_modules/swagger-ui/dist'));
};

module.exports.setup = app => {
  setupSwaggerDocument(app);
  setupSwaggerUi(app);
}
