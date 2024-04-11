/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const path = require('path')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sounds').del()
  await knex('sounds').insert([
    {id: 1, name: 'Alarm1', path: path.join(__dirname, '..', 'assets', 'sounds', 'sound.mp3')}
  ]);
};
