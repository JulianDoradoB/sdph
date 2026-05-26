import { sequelize } from '../config/database';
import { User } from './user.model';
import { Patient } from './patient.model';
import { Triage } from './triage.model';
import { Prescription } from './prescription.model';

// Relaciones Uno a Muchos
Patient.hasMany(Triage, { foreignKey: 'patientId', as: 'triages' });
Triage.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

User.hasMany(Triage, { foreignKey: 'nurseId', as: 'performedTriages' });
Triage.belongsTo(User, { foreignKey: 'nurseId', as: 'nurse' });

Triage.hasMany(Prescription, { foreignKey: 'triageId', as: 'prescriptions' });
Prescription.belongsTo(Triage, { foreignKey: 'triageId', as: 'triage' });

User.hasMany(Prescription, { foreignKey: 'doctorId', as: 'writtenPrescriptions' });
Prescription.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

export { sequelize, User, Patient, Triage, Prescription };