import React, { useMemo } from 'react';
import { ScrollView, Text, View, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useData, formatDate } from '@/lib/data-context';
import { Patient, RiskLevel } from '@/lib/types';

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#10B981',
  moderate: '#F59E0B',
  high: '#EF4444',
  critical: '#7C3AED',
};

const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'Bajo',
  moderate: 'Moderado',
  high: 'Alto',
  critical: 'Crítico',
};

function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <View style={{ backgroundColor: RISK_COLORS[level] + '22', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
      <Text style={{ color: RISK_COLORS[level], fontSize: 11, fontWeight: '700' }}>{RISK_LABELS[level]}</Text>
    </View>
  );
}

function PatientInitials({ name }: { name: string }) {
  const colors = useColors();
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  return (
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>{initials}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const colors = useColors();
  const router = useRouter();
  const { data } = useData();

  const recentPatients = useMemo(() =>
    [...data.patients]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5),
    [data.patients]
  );

  const highRiskPatients = useMemo(() =>
    data.patients.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical'),
    [data.patients]
  );

  const recentSessions = useMemo(() =>
    [...data.sessions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3),
    [data.sessions]
  );

  const therapistName = data.therapist?.name ?? 'Terapeuta';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  const quickActions = [
    { icon: 'person.badge.plus', label: 'Nuevo\nPaciente', route: '/patient/new', color: colors.primary },
    { icon: 'clipboard.fill', label: 'Aplicar\nEscala', route: '/tools', color: '#8B5CF6' },
    { icon: 'thought.bubble.fill', label: 'Registro\nPensamiento', route: '/thought/new', color: '#10B981' },
    { icon: 'pencil.and.list.clipboard', label: 'Nueva\nSesión', route: '/session/new', color: '#F59E0B' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View style={{ backgroundColor: colors.primary, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
          <Text style={{ color: 'white', fontSize: 14, opacity: 0.85 }}>{greeting},</Text>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginTop: 2 }}>{therapistName}</Text>
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 12 }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>{data.patients.length}</Text>
              <Text style={{ color: 'white', fontSize: 12, opacity: 0.85, marginTop: 2 }}>Pacientes</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 12 }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>{data.sessions.length}</Text>
              <Text style={{ color: 'white', fontSize: 12, opacity: 0.85, marginTop: 2 }}>Sesiones</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 12 }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>{data.scaleResults.length}</Text>
              <Text style={{ color: 'white', fontSize: 12, opacity: 0.85, marginTop: 2 }}>Evaluaciones</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20, gap: 20 }}>
          {/* Quick Actions */}
          <View>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Acciones rápidas</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.label}
                  onPress={() => router.push(action.route as any)}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 14,
                    padding: 12,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                >
                  <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: action.color + '18', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                    <IconSymbol name={action.icon as any} size={22} color={action.color} />
                  </View>
                  <Text style={{ color: colors.foreground, fontSize: 10, fontWeight: '600', textAlign: 'center', lineHeight: 14 }}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Alertas de riesgo */}
          {highRiskPatients.length > 0 && (
            <View>
              <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
                ⚠️ Pacientes en riesgo elevado
              </Text>
              {highRiskPatients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => router.push(`/patient/${patient.id}` as any)}
                  style={({ pressed }) => ({
                    backgroundColor: '#EF444411',
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#EF444433',
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <PatientInitials name={`${patient.firstName} ${patient.lastName}`} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ color: colors.foreground, fontWeight: '600', fontSize: 14 }}>{patient.firstName} {patient.lastName}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{patient.diagnosis}</Text>
                  </View>
                  <RiskBadge level={patient.riskLevel} />
                </Pressable>
              ))}
            </View>
          )}

          {/* Pacientes recientes */}
          {recentPatients.length > 0 ? (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '700' }}>Pacientes recientes</Text>
                <Pressable onPress={() => router.push('/patients' as any)}>
                  <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>Ver todos</Text>
                </Pressable>
              </View>
              {recentPatients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => router.push(`/patient/${patient.id}` as any)}
                  style={({ pressed }) => ({
                    backgroundColor: colors.surface,
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <PatientInitials name={`${patient.firstName} ${patient.lastName}`} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ color: colors.foreground, fontWeight: '600', fontSize: 14 }}>{patient.firstName} {patient.lastName}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{patient.diagnosis}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <RiskBadge level={patient.riskLevel} />
                    <Text style={{ color: colors.muted, fontSize: 10 }}>{formatDate(patient.updatedAt)}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' }}>
              <IconSymbol name="person.2.fill" size={40} color={colors.muted} />
              <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600', marginTop: 12 }}>Sin pacientes aún</Text>
              <Text style={{ color: colors.muted, fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 18 }}>
                Agrega tu primer paciente para comenzar a gestionar tu práctica clínica.
              </Text>
              <Pressable
                onPress={() => router.push('/patient/new' as any)}
                style={({ pressed }) => ({
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginTop: 16,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>+ Agregar paciente</Text>
              </Pressable>
            </View>
          )}

          {/* Sesiones recientes */}
          {recentSessions.length > 0 && (
            <View>
              <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Últimas sesiones</Text>
              {recentSessions.map((session) => {
                const patient = data.patients.find(p => p.id === session.patientId);
                return (
                  <View
                    key={session.id}
                    style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: colors.foreground, fontWeight: '600', fontSize: 14 }}>
                        {patient ? `${patient.firstName} ${patient.lastName}` : 'Paciente'}
                      </Text>
                      <Text style={{ color: colors.muted, fontSize: 12 }}>{formatDate(session.date)}</Text>
                    </View>
                    <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }} numberOfLines={2}>{session.objectives}</Text>
                    {session.techniquesUsed.length > 0 && (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                        {session.techniquesUsed.slice(0, 3).map((t) => (
                          <View key={t} style={{ backgroundColor: colors.primary + '18', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                            <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '600' }}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
