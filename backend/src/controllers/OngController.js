const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*'); // Selecionar todos os campos de todos os registros dentro da tabela ongs
    
        return response.json(ongs);
    },

   
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; // corpo da nossa requisição

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id }) // o request guarda todos os dados que vem atravésda nossa requisição
    }
};