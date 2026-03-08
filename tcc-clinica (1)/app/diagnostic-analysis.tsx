import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { analyzeDiagnosticSuggestions, generateInterventionSuggestions } from '@/lib/ai-diagnostic-service';
import { DIAGNOSTIC_DISCLAIMER } from '@/lib/types-advanced';

function DiagnosticCard({ diagnosis, isPrimary }: { diagnosis: any; isPrimary: boolean }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(isPrimary);

  const probabilityColor = diagnosis.probability > 70 ? '#10B981' : diagnosis.probability > 50 ? '#F59E0B' : '#EF4444';

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: isPrimary ? colors.primary : colors.border, borderWidth: isPrimary ? 2 : 1 }]}>
      <Pressable onPress={() => setExpanded(!expanded)} style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          {isPrimary && (
            <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>DIAGNÓSTICO PRINCIPAL</Text>
            </View>
          )}
          <Text style={[styles.diagnosisName, { color: colors.foreground }]}>{diagnosis.name}</Text>
          <Text style={[styles.diagnosisCode, { color: colors.muted }]}>{diagnosis.code}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <View style={[styles.probabilityBadge, { backgroundColor: probabilityColor + '20' }]}>
            <Text style={{ color: probabilityColor, fontSize: 16, fontWeight: '800' }}>{diagnosis.probability.toFixed(0)}%</Text>
          </View>
          <IconSymbol name={expanded ? 'chevron.up' : 'chevron.down'} size={20} color={colors.muted} />
        </View>
      </Pressable>

      {expanded && (
        <View style={[styles.cardContent, { borderTopColor: colors.border }]}>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Justificación Clínica</Text>
            <Text style={[styles.sectionText, { color: colors.muted }]}>{diagnosis.justification}</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Criterios Coincidentes ({diagnosis.matchedCriteria.length})</Text>
            {diagnosis.matchedCriteria.slice(0, 3).map((criterion: string, i: number) => (
              <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                <IconSymbol name="checkmark.circle.fill" size={16} color="#10B981" />
                <Text style={[styles.criterionText, { color: colors.muted, flex: 1 }]}>{criterion}</Text>
              </View>
            ))}
            {diagnosis.matchedCriteria.length > 3 && (
              <Text style={[styles.moreText, { color: colors.primary }]}>+{diagnosis.matchedCriteria.length - 3} más</Text>
            )}
          </View>

          {diagnosis.specifiers && diagnosis.specifiers.length > 0 && (
            <View>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Especificadores Posibles</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {diagnosis.specifiers.slice(0, 3).map((spec: string, i: number) => (
                  <View key={i} style={[styles.specifierTag, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '600' }}>{spec}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default function DiagnosticAnalysisScreen() {
  const colors = useColors();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [interventionSuggestion, setInterventionSuggestion] = useState<any>(null);

  useEffect(() => {
    loadDiagnosticAnalysis();
  }, []);

  const loadDiagnosticAnalysis = async () => {
    try {
      setLoading(true);
      // Simulación de análisis - en producción usar datos reales de entrevista
      const mockInterview = {
        id: '1',
        patientId: '1',
        therapistId: '1',
        date: new Date().toISOString(),
        chiefComplaint: 'Depresión y ansiedad',
        symptomOnset: 'Hace 3 meses',
        symptomDuration: '3 meses',
        personalHistory: 'Pérdida de trabajo',
        familyHistory: 'Madre con depresión',
        medicalHistory: 'Hipertensión',
        psychiatricHistory: '',
        substanceUse: '',
        mentalStatus: {
          appearance: 'Descuidado',
          behavior: 'Lentificado',
          speech: 'Bajo volumen',
          mood: 'Deprimido',
          affect: 'Restringido',
          thoughtProcess: 'Lentificado',
          thoughtContent: 'Pesimismo',
          suicidalIdeation: 'passive' as any,
          homicidalIdeation: 'none' as any,
          orientation: 'Orientado',
          memory: 'Normal',
          concentration: 'Disminuida',
          insight: 'Bueno',
          judgment: 'Normal',
        },
        abcAnalysis: [],
        symptoms: ['Depresión', 'Ansiedad', 'Insomnio', 'Fatiga', 'Pérdida de interés'],
        clinicalNotes: 'Paciente con síntomas depresivos moderados',
        status: 'completed' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const analysis = await analyzeDiagnosticSuggestions(mockInterview);
      setDiagnoses(analysis.matchedDiagnoses);

      if (analysis.matchedDiagnoses.length > 0) {
        const suggestion = generateInterventionSuggestions(analysis.matchedDiagnoses[0].code);
        setInterventionSuggestion(suggestion);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar el análisis diagnóstico');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDiagnosis = () => {
    if (diagnoses.length > 0) {
      Alert.alert('Diagnóstico Confirmado', `${diagnoses[0].name} ha sido registrado como diagnóstico presuntivo.`, [
        { text: 'Crear Plan de Intervención', onPress: () => router.push('/intervention-plan' as any) },
        { text: 'Revisar Diagnósticos', style: 'cancel' },
      ]);
    }
  };

  if (loading) {
    return (
      <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.muted, marginTop: 16 }]}>
            Analizando síntomas y criterios DSM-5-TR...
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Análisis Diagnóstico</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Alert Banner */}
        <View style={[styles.alertBanner, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
          <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
          <Text style={[styles.alertText, { color: colors.primary }]}>
            Análisis basado en criterios DSM-5-TR. Requiere validación clínica profesional.
          </Text>
        </View>

        {/* Diagnósticos Sugeridos */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.sectionHeading, { color: colors.foreground }]}>Diagnósticos Presuntivos</Text>
          <Text style={[styles.sectionSubtext, { color: colors.muted, marginBottom: 12 }]}>
            Ordenados por probabilidad de coincidencia
          </Text>
          {diagnoses.length > 0 ? (
            diagnoses.map((diagnosis, index) => (
              <DiagnosticCard key={diagnosis.code} diagnosis={diagnosis} isPrimary={index === 0} />
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <IconSymbol name="exclamationmark.triangle.fill" size={40} color={colors.muted} />
              <Text style={[styles.emptyStateText, { color: colors.foreground }]}>Sin diagnósticos coincidentes</Text>
              <Text style={[styles.emptyStateSubtext, { color: colors.muted }]}>
                Se requiere evaluación clínica adicional
              </Text>
            </View>
          )}
        </View>

        {/* Sugerencia de Plan de Intervención */}
        {interventionSuggestion && (
          <View style={[styles.interventionCard, { backgroundColor: '#8B5CF6' + '10', borderColor: '#8B5CF6' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <IconSymbol name="lightbulb.fill" size={20} color="#8B5CF6" />
              <Text style={[styles.interventionTitle, { color: '#8B5CF6' }]}>Plan de Intervención Sugerido</Text>
            </View>
            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.interventionLabel, { color: colors.muted }]}>Sesiones estimadas:</Text>
                <Text style={[styles.interventionValue, { color: colors.foreground }]}>{interventionSuggestion.estimatedSessions}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.interventionLabel, { color: colors.muted }]}>Duración (semanas):</Text>
                <Text style={[styles.interventionValue, { color: colors.foreground }]}>{interventionSuggestion.estimatedDuration}</Text>
              </View>
              <View>
                <Text style={[styles.interventionLabel, { color: colors.muted, marginBottom: 6 }]}>Módulos TCC:</Text>
                <View style={{ gap: 6 }}>
                  {interventionSuggestion.modules.map((module: string, i: number) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <IconSymbol name="checkmark" size={14} color="#8B5CF6" />
                      <Text style={{ color: colors.foreground, fontSize: 13 }}>{module}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Disclaimer Legal */}
        <View style={[styles.disclaimerCard, { backgroundColor: '#EF4444' + '08', borderColor: '#EF4444' + '30' }]}>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <IconSymbol name="exclamationmark.triangle.fill" size={18} color="#EF4444" />
            <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 13 }}>Aviso Legal</Text>
          </View>
          <Text style={[styles.disclaimerText, { color: colors.muted }]}>
            {DIAGNOSTIC_DISCLAIMER}
          </Text>
        </View>

        {/* Botones de acción */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, flex: 1 }]}
          >
            <Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 14 }}>Volver</Text>
          </Pressable>
          <Pressable
            onPress={handleConfirmDiagnosis}
            disabled={diagnoses.length === 0}
            style={[
              styles.button,
              { backgroundColor: diagnoses.length > 0 ? colors.primary : colors.muted, flex: 1, opacity: diagnoses.length > 0 ? 1 : 0.5 }
            ]}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Confirmar y Continuar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: 14 },
  alertBanner: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 20, gap: 10 },
  alertText: { flex: 1, fontSize: 12, lineHeight: 16, fontWeight: '500' },
  sectionHeading: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  sectionSubtext: { fontSize: 13 },
  card: { borderRadius: 14, borderWidth: 1, marginBottom: 12, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6, alignSelf: 'flex-start' },
  diagnosisName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  diagnosisCode: { fontSize: 12 },
  probabilityBadge: { width: 60, height: 60, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardContent: { borderTopWidth: 0.5, paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  sectionTitle: { fontSize: 12, fontWeight: '700', marginBottom: 6 },
  sectionText: { fontSize: 12, lineHeight: 18 },
  criterionText: { fontSize: 12, lineHeight: 16 },
  moreText: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  specifierTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  emptyState: { borderRadius: 14, borderWidth: 1, paddingVertical: 40, alignItems: 'center', gap: 8 },
  emptyStateText: { fontSize: 14, fontWeight: '700' },
  emptyStateSubtext: { fontSize: 12 },
  interventionCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 20 },
  interventionTitle: { fontSize: 13, fontWeight: '700' },
  interventionLabel: { fontSize: 12 },
  interventionValue: { fontSize: 13, fontWeight: '700' },
  disclaimerCard: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 20 },
  disclaimerText: { fontSize: 11, lineHeight: 16 },
  button: { borderRadius: 10, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
});
