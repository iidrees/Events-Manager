require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: 'udmihcxr',
    password: 'ySU0_nN0OAf5bQjjviHieNrWv5zBXvl8',
    database: 'udmihcxr',
    host: 'baasu.db.elephantsql.com',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};

/* ,
  test: {
    use_env_variable: 'DB_TEST_URL',
    dialect: 'postgres'
    
  }, */