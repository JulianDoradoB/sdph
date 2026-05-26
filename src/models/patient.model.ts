import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Patient extends Model {
  public id!: string;
  public dni!: string;
  public firstName!: string;
  public lastName!: string;
  public birthDate!: Date;
  public gender!: string;
}

Patient.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'Patient' });