import { Router } from 'express';
import { TriageController } from '../controllers/triage.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { UserRole, TriageStatus } from '../constants/triage';
import { z } from 'zod';

const router = Router();

const triageSchema = z.object({
  patientId: z.string().uuid(),
  systolicBp: z.number().int(),
  diastolicBp: z.number().int(),
  heartRate: z.number().int(),
  respiratoryRate: z.number().int(),
  temperature: z.number(),
  oxygenSaturation: z.number().int().max(100),
  painScale: z.number().int().min(0).max(10),
  symptomsDescription: z.string()
});

router.use(protect);
router.post('/', restrictTo(UserRole.ENFERMERO, UserRole.ADMIN), validateBody(triageSchema), TriageController.create);
router.get('/queue', restrictTo(UserRole.MEDICO, UserRole.ENFERMERO, UserRole.ADMIN), TriageController.getQueue);
router.patch('/:id/status', restrictTo(UserRole.MEDICO, UserRole.ADMIN), validateBody(z.object({ status: z.nativeEnum(TriageStatus) })), TriageController.updateStatus);

export default router;