import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ManchesterLevel, TriageStatus } from '../constants/triage';

export class Triage extends Model {
  public id!: string;
  public patientId!: string;
  public nurseId!: string;
  public systolicBp!: number;
  public diastolicBp!: number;
  public heartRate!: number;
  public respiratoryRate!: number;
  public temperature!: number;
  public oxygenSaturation!: number;
  public painScale!: number;
  public symptomsDescription!: string;
  public manchesterLevel!: ManchesterLevel;
  public priorityScore!: number; 
  public status!: TriageStatus;
}

Triage.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patientId: { type: DataTypes.UUID, allowNull: false },
  nurseId: { type: DataTypes.UUID, allowNull: false },
  systolicBp: { type: DataTypes.INTEGER, allowNull: false },
  diastolicBp: { type: DataTypes.INTEGER, allowNull: false },
  heartRate: { type: DataTypes.INTEGER, allowNull: false },
  respiratoryRate: { type: DataTypes.INTEGER, allowNull: false },
  temperature: { type: DataTypes.FLOAT, allowNull: false },
  oxygenSaturation: { type: DataTypes.INTEGER, allowNull: false },
  painScale: { type: DataTypes.INTEGER, allowNull: false },
  symptomsDescription: { type: DataTypes.TEXT, allowNull: false },
  manchesterLevel: { type: DataTypes.ENUM(...Object.values(ManchesterLevel)), allowNull: false },
  priorityScore: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM(...Object.values(TriageStatus)), defaultValue: TriageStatus.ESPERA_ATENCION }
}, { sequelize, modelName: 'Triage' });