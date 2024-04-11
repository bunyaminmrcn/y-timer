/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', function (table) {
    table.increments();
    table.bigInteger('alarmId')
      .unsigned()
      .index()
      .references('id')
      .inTable('alarms')
    table.bigInteger('notebookId')
      .unsigned()
      .index()
      .references('id')
      .inTable('notebooks')

    table.bigInteger('x')
      .unsigned()
    table.bigInteger('y')
      .unsigned()
    table.bigInteger('width')
      .unsigned()
    table.bigInteger('height')
      .unsigned()
    table.string('background').notNullable()
    table.string('textContent').notNullable();
    table.string('title').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('notes')
};
