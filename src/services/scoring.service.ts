import { ManchesterLevel } from '../constants/triage';

interface Vitals {
  systolicBp: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  painScale: number;
}

export class ScoringService {
  /**
   * Ejecuta el cálculo automático del score clínico y el nivel Manchester.
   * Mitiga el riesgo de subclasificación de pacientes críticos.
   */
  public static calculatePriority(vitals: Vitals): { level: ManchesterLevel; score: number } {
    let score = 0;

    // Evaluación analítica de signos vitales
    if (vitals.oxygenSaturation < 90) score += 50;
    else if (vitals.oxygenSaturation < 95) score += 15;

    if (vitals.heartRate > 120 || vitals.heartRate < 50) score += 20;
    if (vitals.systolicBp > 180 || vitals.systolicBp < 90) score += 20;
    if (vitals.temperature >= 39 || vitals.temperature < 35) score += 15;
    score += (vitals.painScale >= 8) ? 15 : vitals.painScale * 1.5;

    // Mapeo determinista basado en el Score Acumulado de Gravedad
    let level = ManchesterLevel.BLUE;
    if (score >= 60) level = ManchesterLevel.RED;
    else if (score >= 40) level = ManchesterLevel.ORANGE;
    else if (score >= 25) level = ManchesterLevel.YELLOW;
    else if (score >= 10) level = ManchesterLevel.GREEN;

    return { level, score: Math.round(score) };
  }
}