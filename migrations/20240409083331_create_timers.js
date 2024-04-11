/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('timers', function (table) {
        table.increments();
        table.string('type').notNullable();
        table.string('val').notNullable();
        table.bigInteger('soundId')
        .unsigned()
        .index()
        .references('id')
        .inTable('sounds');
    
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('timers');
};
