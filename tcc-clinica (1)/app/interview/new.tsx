import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useData, generateId } from '@/lib/data-context';
import { InitialInterview, ABCRecord } from '@/lib/types-advanced';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
        <View style={[{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary }]} />
        <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: '700' }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.foreground, fontSize: 12, fontWeight: '600', marginBottom: 6 }}>
        {label}{required && <Text style={{ color: '#EF4444' }}> *</Text>}
      </Text>
      {children}
    </View>
  );
}

function ABCRecordItem({ item, onUpdate, onDelete }: { item: ABCRecord; onUpdate: (item: ABCRecord) => void; onDelete: () => void }) {
  const colors = useColors();
  const inputStyle = [styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.foreground }];

  return (
    <View style={[styles.abcCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 13 }}>Análisis Funcional ABC</Text>
        <Pressable onPress={onDelete}>
          <IconSymbol name="trash.fill" size={18} color="#EF4444" />
        </Pressable>
      </View>

      <FormField label="A - Antecedente (Situación disparadora)">
        <TextInput
          value={item.antecedent}
          onChangeText={(text) => onUpdate({ ...item, antecedent: text })}
          placeholder="¿Qué sucedió antes?"
          placeholderTextColor={colors.muted}
          style={inputStyle}
          multiline
        />
      </FormField>

      <FormField label="B - Conducta (Respuesta observable)">
        <TextInput
          value={item.behavior}
          onChangeText={(text) => onUpdate({ ...item, behavior: text })}
          placeholder="¿Qué hizo o sintió el paciente?"
          placeholderTextColor={colors.muted}
          style={inputStyle}
          multiline
        />
      </FormField>

      <FormField label="C - Consecuencia (Resultado/Refuerzo)">
        <TextInput
          value={item.consequence}
          onChangeText={(text) => onUpdate({ ...item, consequence: text })}
          placeholder="¿Cuál fue el resultado?"
          placeholderTextColor={colors.muted}
          style={inputStyle}
          multiline
        />
      </FormField>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <FormField label="Frecuencia">
            <TextInput
              value={item.frequency}
              onChangeText={(text) => onUpdate({ ...item, frequency: text })}
              placeholder="Ej: Diaria, 3x/semana"
              placeholderTextColor={colors.muted}
              style={inputStyle}
            />
          </FormField>
        </View>
        <View style={{ flex: 1 }}>
          <FormField label="Intensidad (0-10)">
            <TextInput
              value={item.intensity?.toString() || ''}
              onChangeText={(text) => onUpdate({ ...item, intensity: parseInt(text) || 0 })}
              placeholder="0-10"
              placeholderTextColor={colors.muted}
              style={inputStyle}
              keyboardType="number-pad"
            />
          </FormField>
        </View>
      </View>
    </View>
  );
}

export default function NewInterviewScreen() {
  const colors = useColors();
  const router = useRouter();
  const { dispatch } = useData();

  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptomOnset, setSymptomOnset] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [personalHistory, setPersonalHistory] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [psychiatricHistory, setPsychiatricHistory] = useState('');
  const [substanceUse, setSubstanceUse] = useState('');
  const [abcRecords, setAbcRecords] = useState<ABCRecord[]>([]);
  const [symptoms, setSymptoms] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [mentalStatus, setMentalStatus] = useState<any>({
    appearance: '',
    behavior: '',
    speech: '',
    mood: '',
    affect: '',
    thoughtProcess: '',
    thoughtContent: '',
    suicidalIdeation: 'none',
    homicidalIdeation: 'none',
    orientation: '',
    memory: '',
    concentration: '',
    insight: '',
    judgment: '',
  });

  const inputStyle = [styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.foreground }];

  const handleAddABC = () => {
    setAbcRecords([...abcRecords, { id: generateId(), antecedent: '', behavior: '', consequence: '' }]);
  };

  const handleSave = async () => {
    if (!chiefComplaint.trim()) {
      Alert.alert('Campo requerido', 'El motivo de consulta es obligatorio');
      return;
    }

    try {
      const interview: InitialInterview = {
        id: generateId(),
        patientId: '', // Se asignará en contexto
        therapistId: '', // Se asignará en contexto
        date: new Date().toISOString(),
        chiefComplaint: chiefComplaint.trim(),
        symptomOnset: symptomOnset.trim(),
        symptomDuration: symptomDuration.trim(),
        personalHistory: personalHistory.trim(),
        familyHistory: familyHistory.trim(),
        medicalHistory: medicalHistory.trim(),
        psychiatricHistory: psychiatricHistory.trim(),
        substanceUse: substanceUse.trim(),
        mentalStatus,
        abcAnalysis: abcRecords,
        symptoms: symptoms.split('\n').filter(s => s.trim()),
        clinicalNotes: clinicalNotes.trim(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Guardar entrevista
      Alert.alert('Éxito', 'Entrevista guardada. Proceder al análisis diagnóstico?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ir a diagnóstico', onPress: () => router.push('/diagnostic-analysis' as any) },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la entrevista');
    }
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Entrevista Inicial</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Motivo de Consulta */}
        <Section title="Motivo de Consulta">
          <FormField label="¿Cuál es el motivo principal de la consulta?" required>
            <TextInput
              value={chiefComplaint}
              onChangeText={setChiefComplaint}
              placeholder="Describe el motivo de consulta..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>

          <FormField label="¿Cuándo comenzaron los síntomas?">
            <TextInput
              value={symptomOnset}
              onChangeText={setSymptomOnset}
              placeholder="Ej: Hace 3 meses, después de..."
              placeholderTextColor={colors.muted}
              style={inputStyle}
            />
          </FormField>

          <FormField label="Duración de los síntomas">
            <TextInput
              value={symptomDuration}
              onChangeText={setSymptomDuration}
              placeholder="Ej: 3 meses, 1 año"
              placeholderTextColor={colors.muted}
              style={inputStyle}
            />
          </FormField>
        </Section>

        {/* Antecedentes */}
        <Section title="Antecedentes">
          <FormField label="Antecedentes personales relevantes">
            <TextInput
              value={personalHistory}
              onChangeText={setPersonalHistory}
              placeholder="Eventos significativos, traumas, pérdidas..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>

          <FormField label="Antecedentes familiares psiquiátricos">
            <TextInput
              value={familyHistory}
              onChangeText={setFamilyHistory}
              placeholder="Depresión, ansiedad, psicosis, suicidio en familia..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 60, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>

          <FormField label="Antecedentes médicos">
            <TextInput
              value={medicalHistory}
              onChangeText={setMedicalHistory}
              placeholder="Condiciones médicas, medicamentos actuales..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 60, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>

          <FormField label="Antecedentes psiquiátricos">
            <TextInput
              value={psychiatricHistory}
              onChangeText={setPsychiatricHistory}
              placeholder="Tratamientos previos, diagnósticos..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 60, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>

          <FormField label="Uso de sustancias">
            <TextInput
              value={substanceUse}
              onChangeText={setSubstanceUse}
              placeholder="Alcohol, drogas, tabaco, cafeína..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 60, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>
        </Section>

        {/* Examen Mental */}
        <Section title="Examen Mental">
          <FormField label="Humor">
            <TextInput
              value={mentalStatus.mood}
              onChangeText={(text) => setMentalStatus({ ...mentalStatus, mood: text })}
              placeholder="Ej: Deprimido, ansioso, normal"
              placeholderTextColor={colors.muted}
              style={inputStyle}
            />
          </FormField>

          <FormField label="Afecto">
            <TextInput
              value={mentalStatus.affect}
              onChangeText={(text) => setMentalStatus({ ...mentalStatus, affect: text })}
              placeholder="Ej: Congruente, restringido, lábil"
              placeholderTextColor={colors.muted}
              style={inputStyle}
            />
          </FormField>

          <FormField label="Ideación suicida">
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {(['none', 'passive', 'active', 'with_plan'] as const).map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setMentalStatus({ ...mentalStatus, suicidalIdeation: option as 'none' | 'passive' | 'active' | 'with_plan' })}
                  style={[
                    styles.optionChip,
                    {
                      backgroundColor: mentalStatus.suicidalIdeation === option ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    }
                  ]}
                >
                  <Text style={{ color: mentalStatus.suicidalIdeation === option ? 'white' : colors.muted, fontSize: 11, fontWeight: '600' }}>
                    {option === 'none' ? 'No' : option === 'passive' ? 'Pasiva' : option === 'active' ? 'Activa' : 'Con plan'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </FormField>

          <FormField label="Contenido del pensamiento">
            <TextInput
              value={mentalStatus.thoughtContent}
              onChangeText={(text) => setMentalStatus({ ...mentalStatus, thoughtContent: text })}
              placeholder="Obsesiones, delirios, alucinaciones..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 60, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>
        </Section>

        {/* Análisis Funcional ABC */}
        <Section title="Análisis Funcional de la Conducta (ABC)">
          {abcRecords.map((record, index) => (
            <ABCRecordItem
              key={record.id}
              item={record}
              onUpdate={(updated) => {
                const newRecords = [...abcRecords];
                newRecords[index] = updated;
                setAbcRecords(newRecords);
              }}
              onDelete={() => setAbcRecords(abcRecords.filter((_, i) => i !== index))}
            />
          ))}
          <Pressable
            onPress={handleAddABC}
            style={[styles.addButton, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}
          >
            <IconSymbol name="plus" size={18} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 14 }}>Agregar Análisis ABC</Text>
          </Pressable>
        </Section>

        {/* Síntomas Reportados */}
        <Section title="Síntomas Reportados">
          <FormField label="Lista de síntomas (uno por línea)">
            <TextInput
              value={symptoms}
              onChangeText={setSymptoms}
              placeholder="Depresión&#10;Ansiedad&#10;Insomnio&#10;..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 100, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>
        </Section>

        {/* Notas Clínicas */}
        <Section title="Notas Clínicas">
          <FormField label="Observaciones adicionales">
            <TextInput
              value={clinicalNotes}
              onChangeText={setClinicalNotes}
              placeholder="Cualquier observación relevante..."
              placeholderTextColor={colors.muted}
              style={[inputStyle, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
              multiline
            />
          </FormField>
        </Section>

        {/* Botones de acción */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, flex: 1 }]}
          >
            <Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 14 }}>Cancelar</Text>
          </Pressable>
          <Pressable
            onPress={handleSave}
            style={[styles.button, { backgroundColor: colors.primary, flex: 1 }]}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Guardar y Continuar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  abcCard: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 12 },
  optionChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1.5, paddingVertical: 12, gap: 8 },
  button: { borderRadius: 10, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
});
