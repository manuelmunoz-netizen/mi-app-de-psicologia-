// ============================================================
// Servicio de IA para Diagnóstico y Análisis Clínico
// ============================================================

import { DSM5_DIAGNOSES, getDiagnosis } from './dsm5-database';
import { InitialInterview, DiagnosticSuggestion, DiagnosticOption, DIAGNOSTIC_DISCLAIMER } from './types-advanced';

interface SymptomMatch {
  symptom: string;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  matchPercentage: number;
}

interface DiagnosticAnalysis {
  symptoms: string[];
  matchedDiagnoses: DiagnosticOption[];
  differentials: DiagnosticOption[];
  clinicalJustification: string;
}

/**
 * Analiza síntomas reportados y sugiere diagnósticos DSM-5-TR
 * @param interview - Entrevista inicial del paciente
 * @returns Análisis diagnóstico con sugerencias ordenadas por probabilidad
 */
export async function analyzeDiagnosticSuggestions(interview: InitialInterview): Promise<DiagnosticAnalysis> {
  // Extraer síntomas de la entrevista
  const symptoms = extractSymptoms(interview);
  
  // Analizar cada diagnóstico contra los síntomas
  const allDiagnoses = Object.values(DSM5_DIAGNOSES);
  const matchedDiagnoses: DiagnosticOption[] = [];

  for (const diagnosis of allDiagnoses) {
    const match = matchDiagnosisCriteria(symptoms, diagnosis);
    if (match.probability > 30) {
      matchedDiagnoses.push({
        code: diagnosis.code,
        name: diagnosis.name,
        system: 'DSM-5-TR',
        probability: match.probability,
        matchedCriteria: match.matchedCriteria,
        unmatchedCriteria: match.unmatchedCriteria,
        justification: generateJustification(diagnosis, match),
        severity: calculateSeverity(symptoms),
        specifiers: diagnosis.specifiers,
      });
    }
  }

  // Ordenar por probabilidad
  matchedDiagnoses.sort((a, b) => b.probability - a.probability);

  // Obtener diagnósticos diferenciales (top 3)
  const differentials = matchedDiagnoses.slice(1, 4);

  // Generar justificación clínica general
  const clinicalJustification = generateClinicalJustification(symptoms, matchedDiagnoses);

  return {
    symptoms,
    matchedDiagnoses: matchedDiagnoses.slice(0, 5), // Top 5
    differentials,
    clinicalJustification,
  };
}

/**
 * Extrae síntomas de la entrevista inicial
 */
function extractSymptoms(interview: InitialInterview): string[] {
  const symptoms: Set<string> = new Set();

  // Agregar síntomas reportados
  interview.symptoms.forEach(s => symptoms.add(s));

  // Extraer del examen mental
  const mentalStatus = interview.mentalStatus;
  if (mentalStatus.mood && mentalStatus.mood !== 'normal') symptoms.add(`Alteración del humor: ${mentalStatus.mood}`);
  if (mentalStatus.affect && mentalStatus.affect !== 'normal') symptoms.add(`Alteración del afecto: ${mentalStatus.affect}`);
  if (mentalStatus.suicidalIdeation !== 'none') symptoms.add(`Ideación suicida: ${mentalStatus.suicidalIdeation}`);
  if (mentalStatus.homicidalIdeation !== 'none') symptoms.add(`Ideación homicida: ${mentalStatus.homicidalIdeation}`);
  if (mentalStatus.thoughtContent) symptoms.add(`Alteración del contenido del pensamiento: ${mentalStatus.thoughtContent}`);

  // Extraer del análisis ABC
  interview.abcAnalysis.forEach(abc => {
    if (abc.behavior) symptoms.add(`Conducta: ${abc.behavior}`);
    if (abc.consequence) symptoms.add(`Consecuencia: ${abc.consequence}`);
  });

  // Agregar del motivo de consulta
  if (interview.chiefComplaint) symptoms.add(`Motivo de consulta: ${interview.chiefComplaint}`);

  return Array.from(symptoms);
}

/**
 * Calcula la coincidencia de síntomas con criterios diagnósticos
 */
function matchDiagnosisCriteria(symptoms: string[], diagnosis: any): {
  probability: number;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
} {
  const matchedCriteria: string[] = [];
  const unmatchedCriteria: string[] = [];
  const symptomText = symptoms.join(' ').toLowerCase();

  // Analizar cada criterio
  for (const criterion of diagnosis.criteria) {
    let criterionMatched = false;

    if (criterion.subCriteria) {
      // Criterios con subcategorías
      let subMatches = 0;
      for (const subCriterion of criterion.subCriteria) {
        if (matchesSymptom(symptomText, subCriterion)) {
          subMatches++;
        }
      }

      const minRequired = criterion.minRequired || 1;
      if (subMatches >= minRequired) {
        criterionMatched = true;
        matchedCriteria.push(`${criterion.letter}: ${criterion.text.substring(0, 50)}...`);
      } else {
        unmatchedCriteria.push(`${criterion.letter}: Requiere ${minRequired} de ${criterion.subCriteria.length} síntomas`);
      }
    } else {
      // Criterios simples
      if (matchesSymptom(symptomText, criterion.text)) {
        criterionMatched = true;
        matchedCriteria.push(`${criterion.letter}: ${criterion.text.substring(0, 50)}...`);
      } else {
        unmatchedCriteria.push(`${criterion.letter}: ${criterion.text.substring(0, 50)}...`);
      }
    }
  }

  // Calcular probabilidad
  const requiredCriteria = diagnosis.criteria.filter((c: any) => c.required).length;
  const matchedRequired = matchedCriteria.length;
  const probability = requiredCriteria > 0 ? (matchedRequired / requiredCriteria) * 100 : 0;

  return {
    probability: Math.min(100, Math.max(0, probability)),
    matchedCriteria,
    unmatchedCriteria,
  };
}

/**
 * Verifica si un síntoma coincide con un criterio
 */
function matchesSymptom(symptomText: string, criterion: string): boolean {
  const criterionLower = criterion.toLowerCase();
  const keywords = extractKeywords(criterionLower);
  return keywords.some(keyword => symptomText.includes(keyword));
}

/**
 * Extrae palabras clave de un criterio para búsqueda
 */
function extractKeywords(text: string): string[] {
  const stopWords = ['de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'es', 'son', 'está', 'están', 'en', 'por', 'para', 'con', 'sin'];
  const words = text.split(/\s+/).filter(w => w.length > 3 && !stopWords.includes(w));
  return words;
}

/**
 * Calcula la severidad basada en síntomas
 */
function calculateSeverity(symptoms: string[]): 'mild' | 'moderate' | 'severe' {
  const severityKeywords = {
    severe: ['suicida', 'homicida', 'psicosis', 'alucinación', 'delirio', 'crisis', 'grave', 'severo'],
    moderate: ['ansiedad', 'depresión', 'pánico', 'fobia', 'obsesión', 'compulsión'],
  };

  const symptomText = symptoms.join(' ').toLowerCase();
  const severeCount = severityKeywords.severe.filter(k => symptomText.includes(k)).length;
  const moderateCount = severityKeywords.moderate.filter(k => symptomText.includes(k)).length;

  if (severeCount > 0) return 'severe';
  if (moderateCount > 1) return 'moderate';
  return 'mild';
}

/**
 * Genera justificación para un diagnóstico específico
 */
function generateJustification(diagnosis: any, match: any): string {
  const matchPercentage = match.probability.toFixed(0);
  const matchedCount = match.matchedCriteria.length;
  const totalCriteria = diagnosis.criteria.length;

  return `Coincidencia del ${matchPercentage}% basada en ${matchedCount} de ${totalCriteria} criterios DSM-5-TR. El paciente presenta síntomas consistentes con ${diagnosis.name}. Se recomienda validación clínica exhaustiva.`;
}

/**
 * Genera justificación clínica general
 */
function generateClinicalJustification(symptoms: string[], diagnoses: DiagnosticOption[]): string {
  if (diagnoses.length === 0) {
    return 'No se encontraron coincidencias diagnósticas claras. Se recomienda evaluación clínica exhaustiva y consideración de otras condiciones médicas.';
  }

  const topDiagnosis = diagnoses[0];
  const secondaryDiagnoses = diagnoses.slice(1, 3).map(d => d.name).join(' y ');

  let justification = `Análisis de síntomas sugiere ${topDiagnosis.name} como diagnóstico presuntivo principal (${topDiagnosis.probability.toFixed(0)}% de coincidencia).`;

  if (secondaryDiagnoses) {
    justification += ` Diagnósticos diferenciales a considerar: ${secondaryDiagnoses}.`;
  }

  justification += ` Se requiere validación clínica exhaustiva y descartar condiciones médicas subyacentes.`;

  return justification;
}

/**
 * Genera sugerencias de planes de intervención basados en diagnóstico
 */
export function generateInterventionSuggestions(diagnosis: string): {
  estimatedSessions: number;
  estimatedDuration: number;
  modules: string[];
  techniques: string[];
} {
  const interventionMap: Record<string, any> = {
    'F32.1': {
      estimatedSessions: 12,
      estimatedDuration: 12,
      modules: ['Psicoeducación sobre depresión', 'Activación conductual', 'Reestructuración cognitiva', 'Prevención de recaídas'],
      techniques: ['Registro de actividades', 'Análisis de pensamientos automáticos', 'Experimentos conductuales', 'Planificación de actividades placenteras'],
    },
    'F41.1': {
      estimatedSessions: 14,
      estimatedDuration: 14,
      modules: ['Psicoeducación sobre ansiedad', 'Técnicas de relajación', 'Reestructuración cognitiva', 'Exposición gradual', 'Prevención de recaídas'],
      techniques: ['Respiración diafragmática', 'Relajación muscular progresiva', 'Exposición interoceptiva', 'Manejo de preocupaciones'],
    },
    'F40.01': {
      estimatedSessions: 16,
      estimatedDuration: 16,
      modules: ['Psicoeducación sobre pánico', 'Técnicas de relajación', 'Exposición interoceptiva', 'Reestructuración cognitiva', 'Prevención de recaídas'],
      techniques: ['Respiración controlada', 'Exposición a sensaciones internas', 'Desafío de creencias catastróficas', 'Prevención de evitación'],
    },
    'F60.3': {
      estimatedSessions: 20,
      estimatedDuration: 20,
      modules: ['Psicoeducación sobre TLP', 'Regulación emocional', 'Tolerancia a la angustia', 'Efectividad interpersonal', 'Mindfulness'],
      techniques: ['Diarios de emociones', 'Técnicas de distracción', 'Técnicas de auto-calmante', 'Validación emocional'],
    },
    'F43.10': {
      estimatedSessions: 16,
      estimatedDuration: 16,
      modules: ['Psicoeducación sobre TEPT', 'Técnicas de relajación', 'Procesamiento del trauma', 'Exposición prolongada', 'Prevención de recaídas'],
      techniques: ['Desensibilización sistemática', 'Reprocesamiento del trauma', 'Técnicas de anclaje', 'Procesamiento emocional'],
    },
  };

  return interventionMap[diagnosis] || {
    estimatedSessions: 12,
    estimatedDuration: 12,
    modules: ['Psicoeducación', 'Reestructuración cognitiva', 'Técnicas conductuales', 'Prevención de recaídas'],
    techniques: ['Análisis funcional', 'Experimentos conductuales', 'Registro de pensamientos', 'Planificación de actividades'],
  };
}

/**
 * Valida que el análisis incluya disclaimer legal
 */
export function addLegalDisclaimer(analysis: DiagnosticAnalysis): DiagnosticAnalysis {
  return {
    ...analysis,
    clinicalJustification: `${analysis.clinicalJustification}\n\n${DIAGNOSTIC_DISCLAIMER}`,
  };
}
