import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa email y contraseña');
      return;
    }

    setLoading(true);
    try {
      // Simulación de login - en producción conectar a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validación básica
      if (email.includes('@') && password.length >= 6) {
        // Guardar token (en producción usar AsyncStorage + JWT)
        router.replace('/(tabs)' as any);
      } else {
        Alert.alert('Error de autenticación', 'Credenciales inválidas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = [
    styles.input,
    { backgroundColor: colors.surface, borderColor: colors.border, color: colors.foreground }
  ];

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
              <IconSymbol name="brain.head.profile" size={48} color={colors.primary} />
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>TCC Clínica</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>Plataforma Profesional de Psicología Clínica</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View>
              <Text style={[styles.label, { color: colors.foreground }]}>Correo Electrónico</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@correo.com"
                placeholderTextColor={colors.muted}
                style={inputStyle}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                returnKeyType="next"
              />
            </View>

            <View>
              <Text style={[styles.label, { color: colors.foreground }]}>Contraseña</Text>
              <View style={[styles.passwordContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.muted}
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <IconSymbol
                    name={showPassword ? 'eye.fill' : 'eye.slash.fill'}
                    size={20}
                    color={colors.muted}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.forgotPassword}>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>¿Olvidaste tu contraseña?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={[
                styles.loginButton,
                { backgroundColor: loading ? colors.muted : colors.primary, opacity: loading ? 0.6 : 1 }
              ]}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>¿No tienes cuenta?</Text>
            <Pressable>
              <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 14 }}>Registrarse</Text>
            </Pressable>
          </View>

          {/* Security Notice */}
          <View style={[styles.securityNotice, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
            <IconSymbol name="shield.fill" size={16} color={colors.primary} />
            <Text style={[styles.securityText, { color: colors.muted }]}>
              Tus datos están protegidos con encriptación de nivel empresarial
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { width: 80, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  form: { gap: 16, marginBottom: 40 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 14 },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 15 },
  eyeIcon: { padding: 8 },
  forgotPassword: { alignSelf: 'flex-end', paddingVertical: 4 },
  loginButton: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  loginButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 20 },
  footerText: { fontSize: 14 },
  securityNotice: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  securityText: { flex: 1, fontSize: 12, lineHeight: 16 },
});
