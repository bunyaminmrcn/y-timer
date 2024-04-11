/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('alarms', function (table) {
    table.increments();
    table.bigInteger('soundId')
    .unsigned()
    .index()
    .references('id')
    .inTable('sounds');
    table.timestamp('content').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('alarms')
};
