// ============================================================
// Tipos de datos centrales para TCC Clínica
// ============================================================

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';

// ── Paciente ────────────────────────────────────────────────
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date
  gender: Gender;
  email?: string;
  phone?: string;
  diagnosis: string;       // Diagnóstico principal DSM-5
  diagnosisCode?: string;  // Código CIE-10 / DSM-5
  riskLevel: RiskLevel;
  therapistNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Sesión Terapéutica ───────────────────────────────────────
export interface TherapySession {
  id: string;
  patientId: string;
  date: string;           // ISO date
  duration: number;       // minutos
  status: SessionStatus;
  objectives: string;
  techniquesUsed: string[];
  homework: string;
  clinicalNotes: string;
  nextSessionGoals?: string;
  createdAt: string;
}

// ── Escalas Diagnósticas ─────────────────────────────────────
export type ScaleId = 'phq9' | 'gad7' | 'bdi2' | 'bai' | 'dass21' | 'pcl5';

export interface ScaleItem {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

export interface Scale {
  id: ScaleId;
  name: string;
  fullName: string;
  description: string;
  items: ScaleItem[];
  scoringRanges: ScoringRange[];
  estimatedMinutes: number;
  reference: string;
}

export interface ScoringRange {
  min: number;
  max: number;
  label: string;
  color: string;
  recommendation: string;
}

export interface ScaleResult {
  id: string;
  patientId: string;
  scaleId: ScaleId;
  scaleName: string;
  date: string;
  answers: number[];
  totalScore: number;
  interpretation: string;
  recommendation: string;
  color: string;
}

// ── Registro de Pensamientos (Modelo ABC) ────────────────────
export interface ThoughtRecord {
  id: string;
  patientId: string;
  date: string;
  situation: string;          // A - Activador / Situación
  emotion: string;            // C - Emoción
  emotionIntensity: number;   // 0-100
  automaticThought: string;   // B - Pensamiento automático
  cognitiveDistortions: string[];
  evidenceFor: string;
  evidenceAgainst: string;
  alternativeThought: string;
  newEmotionIntensity: number; // 0-100
  sessionId?: string;
  createdAt: string;
}

// ── Distorsiones Cognitivas ──────────────────────────────────
export interface CognitiveDistortion {
  id: string;
  name: string;
  description: string;
  example: string;
  challenge: string;
}

// ── Activación Conductual ────────────────────────────────────
export interface ActivityRecord {
  id: string;
  patientId: string;
  date: string;
  activity: string;
  plannedTime: string;
  completedTime?: string;
  completed: boolean;
  moodBefore: number;  // 0-10
  moodAfter?: number;  // 0-10
  notes?: string;
}

// ── Perfil del Terapeuta ─────────────────────────────────────
export interface TherapistProfile {
  name: string;
  specialty: string;
  licenseNumber?: string;
  institution?: string;
  createdAt: string;
}

// ── Datos de la App ──────────────────────────────────────────
export interface AppData {
  therapist: TherapistProfile | null;
  patients: Patient[];
  sessions: TherapySession[];
  scaleResults: ScaleResult[];
  thoughtRecords: ThoughtRecord[];
  activityRecords: ActivityRecord[];
}
