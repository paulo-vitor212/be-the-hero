const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/ongs', OngController.create);

routes.get('/ongs', OngController.index);

routes.delete('/ongs', OngController.delete);

routes.put('/ongs', OngController.update);

routes.post('/incidents', IncidentController.create);

routes.put('/incidents/:id', IncidentController.edit);

routes.get('/incidents', IncidentController.index);

routes.get('/incidents', IncidentController.indexByOng);

routes.get('/incidents/:id', IncidentController.show);

routes.delete('/incidents', IncidentController.delete);

routes.post('/session', SessionController.session);


module.exports = routes;
