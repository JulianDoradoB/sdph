import { Router } from 'express';
import { PrescriptionController } from '../controllers/prescription.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { UserRole } from '../constants/triage';
import { z } from 'zod';

const router = Router();

const prescriptionSchema = z.object({
  triageId: z.string().uuid(),
  medicationName: z.string(),
  dosage: z.string(),
  frequency: z.string()
});

router.use(protect);
router.post('/', restrictTo(UserRole.MEDICO, UserRole.ADMIN), validateBody(prescriptionSchema), PrescriptionController.create);
router.patch('/:id/dispel', restrictTo(UserRole.MEDICO, UserRole.ADMIN, UserRole.ENFERMERO), PrescriptionController.dispel);

export default router;