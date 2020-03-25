
exports.up = function(knex) { // O método up é responsável pela criação da tabela 
  return knex.schema.createTable('ongs', function (table) { // criando uma nova tabela no bancos de dados
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) { // O método down é responsávle por deletar uma tabela
  return knex.schema.dropTable('ongs');
};
