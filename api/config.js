import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the postgress DB')
  })
  .catch(err => {
    console.error('Unable connecting to the postgres DB:', err.message)
  });

  const jwtsecret = process.env.JWT_SECRET;

  const config = {
    sequelize,
    jwtsecret,
    port: process.env.PORT || 5000,
  }

  export default config;