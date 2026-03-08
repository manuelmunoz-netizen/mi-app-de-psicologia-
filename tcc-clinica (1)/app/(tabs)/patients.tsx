import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet } from 'react-native';
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

function PatientCard({ patient, onPress }: { patient: Patient; onPress: () => void }) {
  const colors = useColors();
  const initials = `${patient.firstName[0]}${patient.lastName[0]}`.toUpperCase();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
        <Text style={[styles.avatarText, { color: colors.primary }]}>{initials}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.patientName, { color: colors.foreground }]}>{patient.firstName} {patient.lastName}</Text>
        <Text style={[styles.diagnosis, { color: colors.muted }]} numberOfLines={1}>{patient.diagnosis || 'Sin diagnóstico'}</Text>
        <Text style={[styles.date, { color: colors.muted }]}>Última actualización: {formatDate(patient.updatedAt)}</Text>
      </View>
      <View style={styles.cardRight}>
        <View style={[styles.riskBadge, { backgroundColor: RISK_COLORS[patient.riskLevel] + '22' }]}>
          <Text style={[styles.riskText, { color: RISK_COLORS[patient.riskLevel] }]}>{RISK_LABELS[patient.riskLevel]}</Text>
        </View>
        <IconSymbol name="chevron.right" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}

export default function PatientsScreen() {
  const colors = useColors();
  const router = useRouter();
  const { data } = useData();
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'all'>('all');

  const filtered = useMemo(() => {
    let list = [...data.patients];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.diagnosis.toLowerCase().includes(q)
      );
    }
    if (filterRisk !== 'all') {
      list = list.filter(p => p.riskLevel === filterRisk);
    }
    return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [data.patients, search, filterRisk]);

  const riskFilters: { key: RiskLevel | 'all'; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'low', label: 'Bajo' },
    { key: 'moderate', label: 'Moderado' },
    { key: 'high', label: 'Alto' },
    { key: 'critical', label: 'Crítico' },
  ];

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Pacientes</Text>
        <Pressable
          onPress={() => router.push('/patient/new' as any)}
          style={({ pressed }) => [styles.addBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
        >
          <IconSymbol name="plus" size={20} color="white" />
        </Pressable>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar paciente..."
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, { color: colors.foreground }]}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <IconSymbol name="xmark" size={16} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* Risk Filters */}
      <View style={styles.filterRow}>
        {riskFilters.map(f => (
          <Pressable
            key={f.key}
            onPress={() => setFilterRisk(f.key)}
            style={[
              styles.filterChip,
              {
                backgroundColor: filterRisk === f.key ? colors.primary : colors.surface,
                borderColor: filterRisk === f.key ? colors.primary : colors.border,
              }
            ]}
          >
            <Text style={[styles.filterText, { color: filterRisk === f.key ? 'white' : colors.muted }]}>{f.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onPress={() => router.push(`/patient/${item.id}` as any)}
          />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 10 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <IconSymbol name="person.2.fill" size={48} color={colors.muted} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              {search || filterRisk !== 'all' ? 'Sin resultados' : 'Sin pacientes'}
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.muted }]}>
              {search || filterRisk !== 'all'
                ? 'Intenta con otros filtros de búsqueda.'
                : 'Agrega tu primer paciente para comenzar.'}
            </Text>
            {!search && filterRisk === 'all' && (
              <Pressable
                onPress={() => router.push('/patient/new' as any)}
                style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.emptyBtnText}>+ Agregar paciente</Text>
              </Pressable>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  addBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12, borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  filterRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  filterText: { fontSize: 12, fontWeight: '600' },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, borderWidth: 1 },
  avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 17, fontWeight: '700' },
  cardContent: { flex: 1, marginLeft: 12 },
  patientName: { fontSize: 15, fontWeight: '700' },
  diagnosis: { fontSize: 12, marginTop: 2 },
  date: { fontSize: 11, marginTop: 4 },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  riskText: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  emptyDesc: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  emptyBtn: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  emptyBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
});
