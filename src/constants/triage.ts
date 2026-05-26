export enum UserRole {
  ADMIN = 'ADMIN',
  MEDICO = 'MEDICO',
  ENFERMERO = 'ENFERMERO',
  RECEPCION = 'RECEPCION'
}

export enum ManchesterLevel {
  RED = 'RED',         // Emergencia inmediata (0 min)
  ORANGE = 'ORANGE',   // Muy urgente (10 min)
  YELLOW = 'YELLOW',   // Urgente (60 min)
  GREEN = 'GREEN',     // Poco urgente (120 min)
  BLUE = 'BLUE'        // No urgente (240 min)
}

export enum TriageStatus {
  ESPERA_ATENCION = 'ESPERA_ATENCION',
  EN_CONSULTA = 'EN_CONSULTA',
  ALTA = 'ALTA',
  DERIVADO = 'DERIVADO'
}