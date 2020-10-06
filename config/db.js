var knexConfig = {
    client: 'mysql',
    debug: true,
    connection: {
      host : 'sql2.freesqldatabase.com',
      user : 'sql2368672',
      password : 'zB6%gL6!',
      database : 'sql2368672'
    }
  }

var knex = require('knex')(knexConfig);


module.exports = knex;