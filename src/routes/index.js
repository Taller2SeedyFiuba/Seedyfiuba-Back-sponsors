const sponsors = require('./sponsors');
const favourites = require('./favourites');
const preferences = require('./preferences');
const viewers = require('./viewers');
const { getMetrics } = require('../controllers/metrics')
const { getDatabaseStatus } = require('../controllers/status')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const { hocError } = require("../errors/handler");


const startRoutes = (app) => {

  app.get('/api/status', hocError(getDatabaseStatus))

  app.get('/api/metrics', hocError(getMetrics))

  app.use('/api/sponsors', sponsors)

  app.use('/api/favourites', favourites)

  app.use('/api/preferences', preferences)

  app.use('/api/viewers', viewers)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = startRoutes;
