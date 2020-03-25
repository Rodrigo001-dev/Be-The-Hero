const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // conecção de desenvolvimento

module.exports = connection;