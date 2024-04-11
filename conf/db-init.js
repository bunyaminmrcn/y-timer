const path = require('path');
const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: path.join(__dirname, '..','db.sqlite3'),
    },
    debug: true,
    log: {
      warn(message) {},
      error(message) {},
      deprecate(message) {},
      debug(message) {
        console.log({message})
      },
    },
});

module.exports = knex;