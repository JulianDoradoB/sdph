import { Triage, Patient, User } from '../models';
import { ScoringService } from './scoring.service';
import { TriageStatus } from '../constants/triage';

export class TriageService {
  public static async createTriage(nurseId: string, data: any) {
    const calculated = ScoringService.calculatePriority({
      systolicBp: data.systolicBp,
      heartRate: data.heartRate,
      temperature: data.temperature,
      oxygenSaturation: data.oxygenSaturation,
      painScale: data.painScale
    });

    return await Triage.create({
      ...data,
      nurseId,
      manchesterLevel: calculated.level,
      priorityScore: calculated.score,
      status: TriageStatus.ESPERA_ATENCION
    });
  }

  public static async getActiveQueue() {
    return await Triage.findAll({
      where: { status: TriageStatus.ESPERA_ATENCION },
      order: [
        ['priorityScore', 'DESC'],
        ['createdAt', 'ASC']
      ],
      include: [
        { model: Patient, as: 'patient', attributes: ['dni', 'firstName', 'lastName'] },
        { model: User, as: 'nurse', attributes: ['name'] }
      ]
    });
  }
}