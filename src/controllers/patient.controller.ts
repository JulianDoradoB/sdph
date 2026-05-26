import { Request, Response, NextFunction } from 'express';
import { Patient } from '../models/patient.model';
import { AppError } from '../utils/errors';

export class PatientController {
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exists = await Patient.findOne({ where: { dni: req.body.dni } });
      if (exists) return next(new AppError(400, 'El paciente con este DNI ya existe.'));

      const patient = await Patient.create(req.body);
      res.status(201).json({ status: 'success', data: patient });
    } catch (e) { next(e); }
  }

  public static async getByDni(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patient = await Patient.findOne({ where: { dni: req.params.dni } });
      if (!patient) return next(new AppError(404, 'Paciente no encontrado.'));
      res.status(200).json({ status: 'success', data: patient });
    } catch (e) { next(e); }
  }
}