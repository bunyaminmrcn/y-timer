/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notes').del()
  await knex('notes').insert([
    {id: 1, notebookId: 1, x: 300, y: 300, width: 300, height: 300, background: '#fff',title: 'Note 1', textContent: 'Hello'},
    {id: 2, notebookId: 1, x: 604, y: 300, width: 300, height: 300, background: '#ff0',title: 'Note 2', textContent: 'World'}
  ]);
};
