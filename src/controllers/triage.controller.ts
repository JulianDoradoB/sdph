import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { TriageService } from '../services/triage.service';
import { Triage } from '../models/triage.model';
import { AppError } from '../utils/errors';

export class TriageController {
  public static async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const triage = await TriageService.createTriage(req.user!.id, req.body);
      res.status(201).json({ status: 'success', data: triage });
    } catch (e) { next(e); }
  }

  public static async getQueue(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const queue = await TriageService.getActiveQueue();
      res.status(200).json({ status: 'success', results: queue.length, data: queue });
    } catch (e) { next(e); }
  }

  public static async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const triage = await Triage.findByPk(id);
      if (!triage) return next(new AppError(404, 'Triage no encontrado.'));

      triage.status = status;
      await triage.save();

      res.status(200).json({ status: 'success', data: triage });
    } catch (e) { next(e); }
  }
}