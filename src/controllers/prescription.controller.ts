import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Prescription } from '../models/prescription.model';
import { AppError } from '../utils/errors';

export class PrescriptionController {
  public static async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const prescription = await Prescription.create({ ...req.body, doctorId: req.user!.id });
      res.status(201).json({ status: 'success', data: prescription });
    } catch (e) { next(e); }
  }

  public static async dispel(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const prescription = await Prescription.findByPk(req.params.id);
      if (!prescription) return next(new AppError(404, 'Receta médica no encontrada.'));

      prescription.isDispelled = true;
      await prescription.save();

      res.status(200).json({ status: 'success', data: prescription });
    } catch (e) { next(e); }
  }
}