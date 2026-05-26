export enum UserRole {
  ADMIN = 'ADMIN',
  MEDICO = 'MEDICO',
  ENFERMERO = 'ENFERMERO',
  RECEPCION = 'RECEPCION'
}

export enum ManchesterLevel {
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE'
}

export enum TriageStatus {
  ESPERA_ATENCION = 'ESPERA_ATENCION',
  EN_CONSULTA = 'EN_CONSULTA',
  ALTA = 'ALTA',
  DERIVADO = 'DERIVADO'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Patient {
  id: string;
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

export interface Triage {
  id: string;
  patientId: string;
  systolicBp: number;
  diastolicBp: number;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
  painScale: number;
  symptomsDescription: string;
  manchesterLevel: ManchesterLevel;
  priorityScore: number;
  status: TriageStatus;
  createdAt: string;
  patient?: Pick<Patient, 'dni' | 'firstName' | 'lastName'>;
}