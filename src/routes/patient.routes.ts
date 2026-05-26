import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { UserRole } from '../constants/triage';
import { z } from 'zod';

const router = Router();

const patientSchema = z.object({
  dni: z.string().min(5),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({ precision: 0 }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  gender: z.string()
});

router.use(protect);
router.post('/', restrictTo(UserRole.ADMIN, UserRole.RECEPCION, UserRole.ENFERMERO), validateBody(patientSchema), PatientController.create);
router.get('/:dni', PatientController.getByDni);

export default router;