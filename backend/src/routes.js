const express = require('express');
const {celebrate,Segments,Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// -------- Rotas de ONGS -------------
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp:Joi.number().required().min(10).max(13),
        city:Joi.string().required(),
        uf:Joi.string().required().length(2),
    }).keys()
}), OngController.create);

routes.get('/ongs', OngController.index);

routes.delete('/ongs', OngController.delete);

routes.put('/ongs',celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        email: Joi.string().email(),
        whatsapp:Joi.number().min(10).max(13),
        city:Joi.string(),
        uf:Joi.string().length(2),
    }).keys()
}), OngController.update);



// -------- Rotas de INCIDENTS -------------



routes.post('/incidents',celebrate({
    [Segments.PARAMS]:Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }).keys()
}), IncidentController.create);


routes.put('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object({
        id: Joi.number().required()
    }).keys()
}), IncidentController.edit);


routes.get('/incidents', IncidentController.index);


routes.get('/incidentsOng', IncidentController.indexOng);


routes.get('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object({
        id: Joi.number().required()
    }).keys()
}), IncidentController.show);



routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object({
        id: Joi.number().required()
    }).keys()
}),IncidentController.delete);



routes.post('/session',celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.string().required()
    }).keys()
}) ,SessionController.session);




module.exports = routes;
