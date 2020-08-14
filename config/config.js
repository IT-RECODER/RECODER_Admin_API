const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "recoder_admin",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_SECRET,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
