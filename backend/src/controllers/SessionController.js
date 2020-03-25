const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body; // O id dá ong que eu tô querendo fazer o login vai vir através do corpo

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) { // Se essa ong não esistir eu vou retornar uma resposta com status 400 que é o status que alguma coisa deu errado
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong) // Se tudo deu certo eu vou retornar os dados da minha ong
    }
}