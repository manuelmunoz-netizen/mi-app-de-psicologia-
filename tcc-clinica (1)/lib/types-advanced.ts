// ============================================================
// Tipos Avanzados para TCC Clínica Profesional
// ============================================================

// ── Autenticación ────────────────────────────────────────────
export interface Therapist {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  specialty: string;
  institution?: string;
  phone?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ── Entrevista Inicial ───────────────────────────────────────
export interface InitialInterview {
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  
  // Motivo de consulta
  chiefComplaint: string;
  symptomOnset: string;
  symptomDuration: string;
  
  // Antecedentes
  personalHistory: string;
  familyHistory: string;
  medicalHistory: string;
  psychiatricHistory: string;
  substanceUse: string;
  
  // Examen mental
  mentalStatus: {
    appearance: string;
    behavior: string;
    speech: string;
    mood: string;
    affect: string;
    thoughtProcess: string;
    thoughtContent: string;
    suicidalIdeation: 'none' | 'passive' | 'active' | 'with_plan';
    homicidalIdeation: 'none' | 'passive' | 'active' | 'with_plan';
    orientation: string;
    memory: string;
    concentration: string;
    insight: string;
    judgment: string;
  };
  
  // Análisis Funcional ABC
  abcAnalysis: ABCRecord[];
  
  // Síntomas reportados
  symptoms: string[];
  
  // Notas clínicas
  clinicalNotes: string;
  
  status: 'draft' | 'completed' | 'reviewed';
  createdAt: string;
  updatedAt: string;
}

export interface ABCRecord {
  id: string;
  antecedent: string;      // A - Situación disparadora
  behavior: string;        // B - Conducta observable
  consequence: string;     // C - Consecuencia (refuerzo/castigo)
  frequency?: string;
  intensity?: number;      // 0-10
  duration?: string;
}

// ── Diagnóstico Presuntivo ───────────────────────────────────
export interface DiagnosticSuggestion {
  id: string;
  patientId: string;
  interviewId: string;
  therapistId: string;
  
  // Diagnósticos sugeridos por IA
  suggestions: DiagnosticOption[];
  
  // Diagnóstico seleccionado por terapeuta
  selectedDiagnosis?: DiagnosticOption;
  
  // Diagnósticos diferenciales considerados
  differentials: DiagnosticOption[];
  
  // Justificación clínica
  clinicalJustification: string;
  
  // Avisos legales
  legalDisclaimer: string;
  
  status: 'pending' | 'reviewed' | 'confirmed';
  confirmedAt?: string;
  confirmedBy?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosticOption {
  code: string;                    // DSM-5-TR o CIE-11
  name: string;
  system: 'DSM-5-TR' | 'CIE-11';
  probability: number;             // 0-100
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  justification: string;
  severity?: 'mild' | 'moderate' | 'severe';
  specifiers?: string[];
}

export interface DSMCriterion {
  id: string;
  diagnosisCode: string;
  criterionLetter: string;          // A, B, C, D, etc.
  description: string;
  required: boolean;
  minRequired?: number;             // Si es grupo de criterios
}

// ── Plan de Intervención TCC ─────────────────────────────────
export interface TCCInterventionPlan {
  id: string;
  patientId: string;
  therapistId: string;
  diagnosisId: string;
  
  // Información general
  diagnosis: string;
  estimatedDuration: number;        // semanas
  estimatedSessions: number;
  
  // Objetivos terapéuticos
  generalObjectives: string[];
  
  // Sesiones estructuradas
  sessions: TCCSession[];
  
  // Comorbilidades consideradas
  comorbidities: string[];
  
  // Notas de personalización
  customizationNotes: string;
  
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate?: string;
  endDate?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface TCCSession {
  sessionNumber: number;
  title: string;
  objectives: string[];
  
  // Módulos TCC a trabajar
  modules: TCCModule[];
  
  // Tareas para casa
  homework: HomeworkTask[];
  
  // Escalas a aplicar
  scalesScheduled?: string[];
  
  estimatedDuration: number;        // minutos
  notes?: string;
}

export interface TCCModule {
  type: 'psychoeducation' | 'cognitive_restructuring' | 'exposure' | 'behavioral_activation' | 'relaxation' | 'relapse_prevention';
  name: string;
  description: string;
  techniques: string[];
  materials?: string[];
}

export interface HomeworkTask {
  id: string;
  description: string;
  type: 'monitoring' | 'thought_record' | 'behavioral' | 'reading' | 'exposure';
  frequency?: string;
  dueDate?: string;
  completed?: boolean;
  completedDate?: string;
  notes?: string;
}

// ── Sesión Terapéutica ───────────────────────────────────────
export interface TherapySessionAdvanced {
  id: string;
  patientId: string;
  therapistId: string;
  planId: string;
  sessionNumber: number;
  
  date: string;
  duration: number;                 // minutos
  
  // Contenido de la sesión
  objectives: string[];
  modulesApplied: TCCModule[];
  techniquesUsed: string[];
  
  // Evaluación de síntomas
  preSymptomsRating: number;        // 0-10
  postSymptomsRating: number;       // 0-10
  
  // Escalas aplicadas
  scalesApplied: { scaleId: string; score: number; date: string }[];
  
  // Tareas asignadas
  homeworkAssigned: HomeworkTask[];
  
  // Cumplimiento de tareas anteriores
  previousHomeworkCompliance: number; // 0-100 %
  
  // Notas clínicas
  clinicalNotes: string;
  
  // Observaciones de progreso
  progressNotes: string;
  
  // Próximos pasos
  nextSteps: string;
  
  // Cambios en el plan si es necesario
  planAdjustments?: string;
  
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// ── Seguimiento y Evolución ──────────────────────────────────
export interface ProgressTracking {
  id: string;
  patientId: string;
  therapistId: string;
  
  // Línea de tiempo de evaluaciones
  evaluations: ProgressEvaluation[];
  
  // Indicadores de mejoría
  improvementIndicators: {
    symptomReduction: number;        // %
    functionalImprovement: number;   // %
    qualityOfLife: number;           // 0-10
  };
  
  // Alertas de deterioro
  deteriorationAlerts: DeteriorationAlert[];
  
  // Gráficas generadas
  charts: ProgressChart[];
  
  lastUpdated: string;
}

export interface ProgressEvaluation {
  date: string;
  sessionNumber: number;
  scaleScores: { scaleId: string; score: number }[];
  clinicalRating: number;           // 0-10
  notes?: string;
}

export interface DeteriorationAlert {
  date: string;
  reason: string;
  severity: 'warning' | 'critical';
  recommendedAction: string;
}

export interface ProgressChart {
  type: 'line' | 'bar' | 'area';
  title: string;
  scaleId: string;
  dataPoints: { date: string; score: number }[];
  trend?: 'improving' | 'stable' | 'declining';
}

// ── Paciente Avanzado ────────────────────────────────────────
export interface PatientAdvanced {
  id: string;
  therapistId: string;
  
  // Información personal
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Other' | 'Prefer not to say';
  email?: string;
  phone?: string;
  
  // Información clínica
  primaryDiagnosis?: string;
  comorbidities: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  suicidalRisk: boolean;
  homicidalRisk: boolean;
  
  // Estado del tratamiento
  treatmentStatus: 'intake' | 'active' | 'completed' | 'paused' | 'discharged';
  startDate?: string;
  endDate?: string;
  
  // Contacto de emergencia
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Consentimiento informado
  consentSigned: boolean;
  consentDate?: string;
  
  // Notas clínicas generales
  clinicalNotes?: string;
  
  // Privacidad
  encryptedPII: boolean;
  
  createdAt: string;
  updatedAt: string;
}

// ── Auditoría y Seguridad ────────────────────────────────────
export interface AuditLog {
  id: string;
  therapistId: string;
  patientId?: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'failure';
  details?: string;
}

// ── Avisos Legales ───────────────────────────────────────────
export const DIAGNOSTIC_DISCLAIMER = `
⚠️ AVISO LEGAL IMPORTANTE

Las sugerencias diagnósticas proporcionadas por este sistema son SOLO un apoyo al criterio clínico del psicólogo colegiado.

• El diagnóstico final es responsabilidad exclusiva del profesional de salud mental.
• Estas sugerencias NO reemplazan la evaluación clínica exhaustiva.
• El sistema utiliza criterios DSM-5-TR y CIE-11, pero la interpretación requiere expertise profesional.
• El terapeuta es responsable de validar, confirmar o rechazar cualquier diagnóstico sugerido.
• Se recomienda consulta con especialistas para diagnósticos complejos.

El uso de este sistema implica aceptación de estas limitaciones y responsabilidades.
`;

export const INTERVENTION_PLAN_DISCLAIMER = `
⚠️ AVISO LEGAL IMPORTANTE

Los planes de intervención sugeridos son RECOMENDACIONES basadas en evidencia TCC.

• El terapeuta debe personalizar el plan según el caso específico.
• Las técnicas deben adaptarse al contexto clínico individual.
• La duración y número de sesiones son estimaciones que pueden variar.
• El terapeuta es responsable de modificar el plan según la evolución del paciente.
• Se requiere consentimiento informado del paciente antes de iniciar tratamiento.

El uso de este sistema implica aceptación de estas limitaciones y responsabilidades.
`;
