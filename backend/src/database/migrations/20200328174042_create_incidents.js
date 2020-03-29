
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();         //Cria chave automaticamente

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //Cria a chave estangeira (Chave da tabela ong)

        table.foreign('ong_id').references('id').inTable('ongs'); //Referencia a chave estrangeira
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
