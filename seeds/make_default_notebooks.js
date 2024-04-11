/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const os = require('os');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notebooks').del()
  await knex('notebooks').insert([
    {id: 1, name: os.userInfo.name}
  ]);
};
