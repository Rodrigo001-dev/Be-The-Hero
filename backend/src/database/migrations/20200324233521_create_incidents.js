
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) { // criando uma nova tabela no bancos de dados
        table.increments(); // vai criar uma chave primaria auto incremantada, toda vez que eu crio um novo incidente vai adicionando um número(1, 2, 3, ...) 

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
