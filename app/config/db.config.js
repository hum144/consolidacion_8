
import { Sequelize } from 'sequelize'

const database = "db_bootcamp";
const username = "postgres";
const password = "123";
const host = "localhost";


const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });


export default sequelize;