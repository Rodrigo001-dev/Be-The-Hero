const express = require('express'); // estou importando o modulo chamado express dentro da variável express
const cors = require('cors');
const routes = require('./routes');

const app = express(); // criando a minha aplicação

app.use(cors());
app.use(express.json()); // Antes de todas as requisiçõse eu estou falando para o express ir no corpo da minha requisição e converter o JSON em um objeto no JavaScript
app.use(routes);

/*
Métodos HTTP:
* GET: Buscar uma informação no back-end
* POST: Cria uma informação no back-end
* PUT: Altera uma informação no back-end
* DELETE: Deleta uma informação no back-end
*/

// Tipos de parâmetros:
// Query params: parâmetros nomeados enviados na rota após ? (Filtros, paginação)
// Routes params: parâmetros utilizaos para indentificar recursos
// Request Body: é o corpo da requisição, utilizado para criar ou alterar recursos



app.listen(3333);
