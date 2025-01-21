import {  DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Bootcamp = sequelize.define(
  'BootCamps',
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull:false,
      
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: false,
    }
  },
  {
    // Other model options go here
  },
);

export default Bootcamp