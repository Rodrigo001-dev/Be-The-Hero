const connection = require('../database/connection');

module.exports = {
     async index(request, response) {
        const { page = 1 } = request.query; // Dentro do request.query eu vou buscar um parametro chamado page, se ele não existir é utilizavél por padrão a página 1

        const [count] = await connection('incidents').count(); // Total de registros

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Quando eu quero relacionar dados de 2 tabelas
            .limit(5) // Eu vou limitar os dados que a busca no banco de dados vis fazer para 5 registros(apenas 5 incidentes)
            .offset((page - 1) * 5) // Eu preciso pular as páginas de 5 em 5 mas a primeira página tem que comesar do 0
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]); // Trazer todos os dados dos incidentes e eu escoli os dados da ong
        response.header('X-Total-Count', count['count(*)']);
         
        return response.json(incidents);
     }, // o nome index é geralmente colocado para fazer a listagem

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        // request.headers; // headers é tudo que caracteriza o contexto da quela requisição

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params; // Eu preciso verificar se  o nosso incidente que está pedindo para ser deletado
        const ong_id = request.headers.authorization; // realmente foi criado pela ong que tá querendo deletar ele

        const incident = await connection('incidents')
            .where('id', id) // Eu quero buscar um incidente onde o id  for igual ao id do request.params
            .select('ong_id')
            .first(); // Vai me retornar apenas um resultado

        if (incident.ong_id != ong_id) { // Se o ong_id desse incidente que eu busque do banco de dados for diferente do ong_id que está logado na aplicação eu vou dar um erro
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};