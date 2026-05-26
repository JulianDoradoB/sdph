import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';
import triageRoutes from './routes/triage.routes';
import prescriptionRoutes from './routes/prescription.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middlewares Globales de Seguridad y Parseo
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Inyección de Capas de Ruteo (REST API)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/triages', triageRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);

// Manejo Centralizado de Excepciones
app.use(errorHandler);

export default app;