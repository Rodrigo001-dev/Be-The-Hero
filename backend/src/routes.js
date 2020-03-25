const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); // Estou desaclopando o modulo de rotas do express em uma nova variável

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create) // O que vem depois da / é chamado de recurso(Alguma coisa que a gente quer buscar), Rota Raíz, rota principal 

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; // é dessa forma no node.js para exportar uma variável de dentro de um arquivo