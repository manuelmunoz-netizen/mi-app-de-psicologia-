// ============================================================
// Base de Datos DSM-5-TR - Criterios Diagnósticos
// ============================================================

export interface DSMDiagnosis {
  code: string;
  name: string;
  fullName: string;
  category: string;
  criteria: DSMCriterion[];
  duration: string;
  onset: string;
  prevalence: string;
  comorbidities: string[];
  differentials: string[];
  specifiers: string[];
}

export interface DSMCriterion {
  letter: string;
  text: string;
  required: boolean;
  minRequired?: number;
  subCriteria?: string[];
}

export const DSM5_DIAGNOSES: Record<string, DSMDiagnosis> = {
  'F32.1': {
    code: 'F32.1',
    name: 'Trastorno Depresivo Mayor, Episodio Moderado',
    fullName: 'Major Depressive Disorder, Single Episode, Moderate',
    category: 'Trastornos del Humor',
    duration: 'Mínimo 2 semanas',
    onset: 'Generalmente entre 20-40 años',
    prevalence: '~5-10% en población general',
    comorbidities: ['Trastorno de Ansiedad Generalizada', 'Trastorno de Pánico', 'Trastorno Obsesivo-Compulsivo'],
    differentials: ['Trastorno Bipolar', 'Trastorno Ciclotímico', 'Duelo'],
    specifiers: ['Con características ansiosas', 'Con características melancólicas', 'Con características atípicas', 'Con psicosis'],
    criteria: [
      {
        letter: 'A',
        text: 'Presencia de 5 o más síntomas durante un período de 2 semanas que representan un cambio del funcionamiento anterior; al menos uno de los síntomas es (1) depresión del humor o (2) pérdida de interés o placer.',
        required: true,
        subCriteria: [
          'Depresión del humor la mayoría del día, casi todos los días',
          'Disminución notable del interés o placer en todas o casi todas las actividades',
          'Pérdida o ganancia significativa de peso o cambios en el apetito',
          'Insomnio o hipersomnia casi todos los días',
          'Agitación o enlentecimiento psicomotor casi todos los días',
          'Fatiga o pérdida de energía casi todos los días',
          'Sentimientos de inutilidad o culpa excesiva o inapropiada',
          'Disminución de la capacidad para concentrarse o tomar decisiones',
          'Pensamientos recurrentes de muerte, ideación suicida recurrente, intento de suicidio o plan específico para suicidarse',
        ],
      },
      {
        letter: 'B',
        text: 'Los síntomas causan malestar clínicamente significativo o deterioro en el funcionamiento social, laboral u otras áreas importantes.',
        required: true,
      },
      {
        letter: 'C',
        text: 'El episodio no es atribuible a los efectos fisiológicos de una sustancia o a otra condición médica.',
        required: true,
      },
      {
        letter: 'D',
        text: 'La ocurrencia del episodio depresivo no se explica mejor por un trastorno esquizoafectivo, esquizofrenia, trastorno de ideas delirantes, otro trastorno psicótico especificado o no especificado, o trastorno bipolar.',
        required: true,
      },
    ],
  },

  'F41.1': {
    code: 'F41.1',
    name: 'Trastorno de Ansiedad Generalizada',
    fullName: 'Generalized Anxiety Disorder',
    category: 'Trastornos de Ansiedad',
    duration: 'Mínimo 6 meses',
    onset: 'Generalmente entre 20-40 años',
    prevalence: '~2-3% en población general',
    comorbidities: ['Trastorno Depresivo Mayor', 'Otros Trastornos de Ansiedad', 'Trastorno por Uso de Sustancias'],
    differentials: ['Trastorno de Pánico', 'Fobia Social', 'Trastorno Obsesivo-Compulsivo'],
    specifiers: ['Con síntomas de depresión', 'De inicio temprano', 'De inicio tardío'],
    criteria: [
      {
        letter: 'A',
        text: 'Ansiedad y preocupación excesivas (expectación aprensiva) que se presentan durante más días que no durante un período mínimo de 6 meses, en relación con varios aspectos de la vida cotidiana.',
        required: true,
      },
      {
        letter: 'B',
        text: 'Al individuo le resulta difícil controlar la preocupación.',
        required: true,
      },
      {
        letter: 'C',
        text: 'La ansiedad y la preocupación se asocian con tres o más de los siguientes síntomas (siendo al menos algunos síntomas presentes durante más días que no durante los últimos 6 meses):',
        required: true,
        minRequired: 3,
        subCriteria: [
          'Inquietud o sensación de estar atrapado/a o con los nervios de punta',
          'Fatigabilidad fácil',
          'Dificultad para concentrarse o quedarse en blanco',
          'Irritabilidad',
          'Tensión muscular',
          'Problemas de sueño (dificultad para conciliar o mantener el sueño, o sueño inquieto o insatisfactorio)',
        ],
      },
      {
        letter: 'D',
        text: 'La ansiedad, la preocupación o los síntomas físicos causan malestar clínicamente significativo o deterioro en el funcionamiento social, laboral u otras áreas importantes.',
        required: true,
      },
      {
        letter: 'E',
        text: 'La alteración no es atribuible a los efectos fisiológicos de una sustancia (p. ej., una droga, un medicamento) o a otra condición médica.',
        required: true,
      },
      {
        letter: 'F',
        text: 'La alteración no se explica mejor por otro trastorno mental.',
        required: true,
      },
    ],
  },

  'F40.01': {
    code: 'F40.01',
    name: 'Trastorno de Pánico con Agorafobia',
    fullName: 'Panic Disorder with Agoraphobia',
    category: 'Trastornos de Ansiedad',
    duration: 'Ataques de pánico recurrentes e inesperados',
    onset: 'Generalmente entre 20-40 años',
    prevalence: '~1-2% en población general',
    comorbidities: ['Trastorno de Ansiedad Generalizada', 'Depresión', 'Trastorno por Uso de Sustancias'],
    differentials: ['Trastorno de Ansiedad Generalizada', 'Fobia Específica', 'Condición Médica'],
    specifiers: ['Con agorafobia', 'Sin agorafobia'],
    criteria: [
      {
        letter: 'A',
        text: 'Ataques de pánico recurrentes e inesperados. Un ataque de pánico es un período discreto de intenso miedo o malestar acompañado de cuatro o más de los siguientes síntomas:',
        required: true,
        minRequired: 4,
        subCriteria: [
          'Palpitaciones o aceleración de la frecuencia cardíaca',
          'Sudoración',
          'Temblor o sacudidas',
          'Sensación de ahogo o dificultad para respirar',
          'Sensación de asfixia',
          'Dolor o molestia en el pecho',
          'Náusea o molestia abdominal',
          'Mareos, inestabilidad, mareo o síncope',
          'Escalofríos o sofocaciones',
          'Parestesias (entumecimiento u hormigueo)',
          'Desrealización (sensación de irrealidad) o despersonalización (estar separado de uno mismo)',
          'Miedo a perder el control o "volverse loco"',
          'Miedo a morir',
        ],
      },
      {
        letter: 'B',
        text: 'Al menos uno de los ataques ha sido seguido durante 1 mes o más de uno o ambos de los siguientes: preocupación persistente sobre la ocurrencia de ataques de pánico adicionales o sus consecuencias, y cambios significativos en el comportamiento relacionados con los ataques.',
        required: true,
      },
      {
        letter: 'C',
        text: 'La agorafobia está presente (si es aplicable).',
        required: false,
      },
      {
        letter: 'D',
        text: 'Los ataques de pánico no son atribuibles a los efectos fisiológicos de una sustancia o a otra condición médica.',
        required: true,
      },
      {
        letter: 'E',
        text: 'Los ataques de pánico no se explican mejor por otro trastorno mental.',
        required: true,
      },
    ],
  },

  'F60.3': {
    code: 'F60.3',
    name: 'Trastorno de Personalidad Inestable del Tipo Límite',
    fullName: 'Borderline Personality Disorder',
    category: 'Trastornos de la Personalidad',
    duration: 'Patrón persistente desde la adolescencia o inicio de la edad adulta',
    onset: 'Generalmente en adolescencia o inicio de la edad adulta',
    prevalence: '~1-2% en población general',
    comorbidities: ['Depresión', 'Trastorno de Ansiedad', 'Trastorno por Uso de Sustancias', 'TEPT'],
    differentials: ['Trastorno Bipolar', 'Trastorno de Personalidad Antisocial', 'Trastorno Histriónico'],
    specifiers: [],
    criteria: [
      {
        letter: 'A',
        text: 'Patrón penetrante de inestabilidad en las relaciones interpersonales, la autoimagen y los afectos, e impulsividad notable que comienza en la edad adulta temprana y está presente en diversos contextos, indicado por cinco o más de los siguientes:',
        required: true,
        minRequired: 5,
        subCriteria: [
          'Esfuerzos frenéticos para evitar un abandono real o imaginado',
          'Patrón de relaciones interpersonales inestables e intensas que alterna entre idealización extrema y devaluación',
          'Autoimagen inestable y persistente',
          'Comportamiento impulsivo en al menos dos áreas que son potencialmente autodestructivas',
          'Comportamiento, amenazas o gestos suicidas recurrentes, o comportamiento de automutilación',
          'Inestabilidad afectiva debida a una reactividad notable a los cambios ambientales',
          'Sensación crónica de vacío',
          'Ira inapropiada e intensa o dificultad para controlar la ira',
          'Ideación paranoide transitoria relacionada con el estrés o síntomas disociativos graves',
        ],
      },
      {
        letter: 'B',
        text: 'El patrón no ocurre exclusivamente durante episodios de depresión o trastorno bipolar y no se explica mejor por otro trastorno mental, condición médica o efecto de una sustancia.',
        required: true,
      },
    ],
  },

  'F84.0': {
    code: 'F84.0',
    name: 'Trastorno del Espectro Autista',
    fullName: 'Autism Spectrum Disorder',
    category: 'Trastornos del Neurodesarrollo',
    duration: 'Síntomas presentes desde la infancia temprana',
    onset: 'Infancia temprana, aunque pueden no manifestarse completamente hasta que las demandas sociales excedan las capacidades',
    prevalence: '~1-2% en población general',
    comorbidities: ['TDAH', 'Depresión', 'Ansiedad', 'Discapacidad Intelectual'],
    differentials: ['TDAH', 'Trastorno del Lenguaje', 'Discapacidad Intelectual'],
    specifiers: ['Nivel 1: Apoyo requerido', 'Nivel 2: Apoyo sustancial requerido', 'Nivel 3: Apoyo muy sustancial requerido'],
    criteria: [
      {
        letter: 'A',
        text: 'Déficits persistentes en la comunicación social y la interacción social en múltiples contextos, indicado por lo siguiente:',
        required: true,
        subCriteria: [
          'Déficits en reciprocidad socioemocional',
          'Déficits en conductas comunicativas no verbales usadas para la interacción social',
          'Déficits en el desarrollo, mantenimiento y comprensión de relaciones',
        ],
      },
      {
        letter: 'B',
        text: 'Patrones restrictivos y repetitivos de comportamiento, intereses o actividades, indicado por al menos dos de los siguientes:',
        required: true,
        minRequired: 2,
        subCriteria: [
          'Movimientos, uso de objetos o habla estereotipados o repetitivos',
          'Insistencia en la igualdad, adherencia inflexible a rutinas, o patrones ritualizados de comportamiento verbal o no verbal',
          'Intereses altamente restringidos y fijos que son anormales en intensidad o enfoque',
          'Hiper o hiporreactividad a estímulos sensoriales o interés inusual en aspectos sensoriales del ambiente',
        ],
      },
      {
        letter: 'C',
        text: 'Los síntomas deben estar presentes en la infancia temprana (pero pueden no manifestarse completamente hasta que las demandas sociales excedan las capacidades limitadas).',
        required: true,
      },
      {
        letter: 'D',
        text: 'Los síntomas causan malestar clínicamente significativo o deterioro en el funcionamiento social, laboral u otras áreas importantes.',
        required: true,
      },
    ],
  },

  'F90.1': {
    code: 'F90.1',
    name: 'Trastorno por Déficit de Atención e Hiperactividad, Tipo Predominantemente Hiperactivo-Impulsivo',
    fullName: 'Attention-Deficit/Hyperactivity Disorder, Predominantly Hyperactive-Impulsive Type',
    category: 'Trastornos del Neurodesarrollo',
    duration: 'Síntomas presentes durante al menos 6 meses',
    onset: 'Antes de los 12 años',
    prevalence: '~5% en niños, ~2.5% en adultos',
    comorbidities: ['Trastorno Oposicionista Desafiante', 'Trastorno de Conducta', 'Depresión', 'Ansiedad'],
    differentials: ['Trastorno de Ansiedad', 'Trastorno del Ánimo', 'Trastorno del Espectro Autista'],
    specifiers: ['Tipo Desatento', 'Tipo Hiperactivo-Impulsivo', 'Tipo Combinado'],
    criteria: [
      {
        letter: 'A',
        text: 'Patrón persistente de inatención y/o hiperactividad-impulsividad que interfiere con el funcionamiento o desarrollo:',
        required: true,
        subCriteria: [
          'Inatención: 6 o más síntomas durante al menos 6 meses',
          'Hiperactividad-Impulsividad: 6 o más síntomas durante al menos 6 meses',
        ],
      },
      {
        letter: 'B',
        text: 'Varios síntomas de inatención o hiperactividad-impulsividad estaban presentes antes de los 12 años.',
        required: true,
      },
      {
        letter: 'C',
        text: 'Varios síntomas están presentes en dos o más contextos (p. ej., en casa, en la escuela o el trabajo, con amigos o parientes, en otras actividades).',
        required: true,
      },
      {
        letter: 'D',
        text: 'Hay evidencia clara de que los síntomas interfieren con o reducen la calidad del funcionamiento social, académico o laboral.',
        required: true,
      },
      {
        letter: 'E',
        text: 'Los síntomas no ocurren exclusivamente durante el curso de esquizofrenia, trastorno esquizoafectivo, trastorno delirante, otro trastorno psicótico especificado o no especificado, o trastorno bipolar.',
        required: true,
      },
      {
        letter: 'F',
        text: 'Los síntomas no se explican mejor por otro trastorno mental.',
        required: true,
      },
    ],
  },

  'F43.10': {
    code: 'F43.10',
    name: 'Trastorno de Estrés Postraumático',
    fullName: 'Post-Traumatic Stress Disorder',
    category: 'Trastornos Relacionados con Trauma y Estrés',
    duration: 'Síntomas presentes durante más de 1 mes',
    onset: 'Después de exposición a evento traumático',
    prevalence: '~3.5% en población general',
    comorbidities: ['Depresión', 'Trastorno de Ansiedad', 'Trastorno por Uso de Sustancias', 'Trastorno del Sueño'],
    differentials: ['Trastorno de Ansiedad Aguda', 'Trastorno de Ajuste', 'Depresión'],
    specifiers: ['Con síntomas disociativos', 'Presentación demorada'],
    criteria: [
      {
        letter: 'A',
        text: 'Exposición a muerte, lesión grave o violencia sexual real o amenazante de una de las siguientes formas: experiencia directa, presencia directa, enterarse de que ocurrió a un familiar o amigo cercano, o exposición repetida o extrema a detalles aversivos del evento traumático.',
        required: true,
      },
      {
        letter: 'B',
        text: 'Presencia de síntomas de intrusión asociados con el evento traumático, comenzando después del evento traumático:',
        required: true,
        minRequired: 1,
        subCriteria: [
          'Recuerdos traumáticos recurrentes, involuntarios e intrusivos',
          'Pesadillas recurrentes cuyo contenido y/o afecto está relacionado con el evento traumático',
          'Reacciones disociativas (p. ej., flashbacks) en las que el individuo siente o actúa como si el evento traumático estuviera ocurriendo',
          'Malestar psicológico intenso o prolongado a la exposición a señales internas o externas que simbolizan o se asemejan a un aspecto del evento traumático',
          'Reacciones fisiológicas marcadas a recordatorios del evento traumático',
        ],
      },
      {
        letter: 'C',
        text: 'Evitación persistente de estímulos asociados con el evento traumático, comenzando después del evento traumático:',
        required: true,
        minRequired: 1,
        subCriteria: [
          'Evitación de o esfuerzos para evitar recuerdos traumáticos, pensamientos o sentimientos estrechamente asociados con el evento traumático',
          'Evitación de o esfuerzos para evitar recordatorios externos (personas, lugares, conversaciones, actividades, objetos, situaciones) que despiertan recuerdos, pensamientos o sentimientos estrechamente asociados con el evento traumático',
        ],
      },
      {
        letter: 'D',
        text: 'Alteraciones negativas en cogniciones y estado de ánimo asociadas con el evento traumático, comenzando o empeorando después del evento traumático:',
        required: true,
        minRequired: 2,
        subCriteria: [
          'Incapacidad de recordar un aspecto importante del evento traumático (típicamente debido a amnesia disociativa, no a otros factores como lesión cerebral, alcohol o drogas)',
          'Creencias o expectativas negativas persistentes y exageradas sobre uno mismo, otros o el mundo',
          'Atribuciones internas distorsionadas sobre la causa o consecuencia del evento traumático que conducen a culpar a uno mismo o a otros',
          'Estado emocional negativo persistente (p. ej., miedo, ira, culpa o vergüenza)',
          'Disminución marcada del interés o participación en actividades significativas',
          'Sentimiento de desapego o extrañamiento de otros',
          'Incapacidad persistente de experimentar emociones positivas (p. ej., incapacidad de experimentar felicidad, satisfacción o sentimientos amorosos)',
        ],
      },
      {
        letter: 'E',
        text: 'Alteraciones marcadas en la excitación y reactividad asociadas con el evento traumático, comenzando o empeorando después del evento traumático:',
        required: true,
        minRequired: 2,
        subCriteria: [
          'Comportamiento irritable o agresivo',
          'Comportamiento imprudente o autodestructivo',
          'Hipervigilancia',
          'Respuesta de sobresalto exagerada',
          'Problemas de concentración',
          'Alteración del sueño',
        ],
      },
      {
        letter: 'F',
        text: 'La duración de la alteración es más de 1 mes.',
        required: true,
      },
      {
        letter: 'G',
        text: 'La alteración causa malestar clínicamente significativo o deterioro en el funcionamiento social, ocupacional u otras áreas importantes.',
        required: true,
      },
      {
        letter: 'H',
        text: 'La alteración no es atribuible a los efectos fisiológicos de una sustancia (p. ej., medicamento, alcohol) o a otra condición médica.',
        required: true,
      },
    ],
  },
};

export function getDiagnosis(code: string): DSMDiagnosis | undefined {
  return DSM5_DIAGNOSES[code];
}

export function searchDiagnoses(query: string): DSMDiagnosis[] {
  const q = query.toLowerCase();
  return Object.values(DSM5_DIAGNOSES).filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.fullName.toLowerCase().includes(q) ||
      d.code.includes(q) ||
      d.category.toLowerCase().includes(q)
  );
}

export function getDiagnosesByCategory(category: string): DSMDiagnosis[] {
  return Object.values(DSM5_DIAGNOSES).filter((d) => d.category === category);
}

export const DSM5_CATEGORIES = [
  'Trastornos del Neurodesarrollo',
  'Trastorno del Espectro Autista',
  'Trastorno por Déficit de Atención e Hiperactividad',
  'Trastornos de Aprendizaje',
  'Trastorno de Movimientos',
  'Trastornos Neurocognitivos',
  'Trastornos Mentales Debidos a Condición Médica',
  'Trastornos Relacionados con Sustancias y Adictivos',
  'Trastornos del Espectro de la Esquizofrenia y Otros Trastornos Psicóticos',
  'Trastorno Bipolar y Trastornos Relacionados',
  'Trastornos Depresivos',
  'Trastorno de Ansiedad',
  'Trastorno Obsesivo-Compulsivo y Trastornos Relacionados',
  'Trastornos Relacionados con Trauma y Estrés',
  'Trastornos Disociativos',
  'Trastorno de Síntomas Somáticos y Trastornos Relacionados',
  'Trastorno Facticio',
  'Trastornos Neurocognitivos',
  'Trastornos de la Personalidad',
  'Trastornos Parafílicos',
  'Otro Trastorno Mental Especificado',
  'Trastorno Mental No Especificado',
];
