import { Sequelize } from 'sequelize';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'), // Creará este archivo solo
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});