import { DataTypes } from "sequelize";
import config from '../config.js';


const { sequelize } = config;

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'lender', 'borrower'),
    defaultValue: 'borrower',
    allowNull: false,
  },
  isActive:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    
  },
},
{
  timestamps: true 
});

export default User;