import {  DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull:false,
      
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    password: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
  },
  {
    // Other model options go here
  },
);

export default User
//console.log(User === sequelize.models.User);