import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Prescription extends Model {
  public id!: string;
  public triageId!: string;
  public doctorId!: string;
  public medicationName!: string;
  public dosage!: string;
  public frequency!: string;
  public isDispelled!: boolean;
}

Prescription.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  triageId: { type: DataTypes.UUID, allowNull: false },
  doctorId: { type: DataTypes.UUID, allowNull: false },
  medicationName: { type: DataTypes.STRING, allowNull: false },
  dosage: { type: DataTypes.STRING, allowNull: false },
  frequency: { type: DataTypes.STRING, allowNull: false },
  isDispelled: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { sequelize, modelName: 'Prescription' });