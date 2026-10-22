import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '../auth/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Login belum berhasil', error.message || 'Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.card}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.title}>Selamat datang</Text>
        <Text style={styles.subtitle}>Masuk untuk melihat aktivitas kuliah Anda.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="nama@email.com"
          placeholderTextColor="#8C929D"
          style={styles.input}
          value={email}
        />

        <Text style={styles.label}>Kata sandi</Text>
        <TextInput
          autoComplete="current-password"
          onChangeText={setPassword}
          placeholder="Minimal 6 karakter"
          placeholderTextColor="#8C929D"
          secureTextEntry
          style={styles.input}
          value={password}
        />

        <Pressable
          accessibilityRole="button"
          disabled={isSubmitting}
          onPress={handleLogin}
          style={({ pressed }) => [styles.button, (pressed || isSubmitting) && styles.buttonPressed]}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Masuk</Text>
          )}
        </Pressable>

        <Text style={styles.helper}>Mode demo: gunakan email valid dan kata sandi minimal 6 karakter.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F0F4F8', flex: 1, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 24, elevation: 4, padding: 24,
    shadowColor: '#1B2535', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12,
  },
  logo: { alignItems: 'center', backgroundColor: '#DBEAFE', borderRadius: 28, height: 56, justifyContent: 'center', marginBottom: 20, width: 56 },
  logoText: { color: '#2563EB', fontSize: 26, fontWeight: '800' },
  title: { color: '#1F2937', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#6B7280', fontSize: 15, lineHeight: 22, marginBottom: 28 },
  label: { color: '#374151', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: { borderColor: '#D1D5DB', borderRadius: 12, borderWidth: 1, color: '#1F2937', fontSize: 16, marginBottom: 18, paddingHorizontal: 14, paddingVertical: 13 },
  button: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 12, minHeight: 50, justifyContent: 'center', marginTop: 4 },
  buttonPressed: { opacity: 0.75 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  helper: { color: '#6B7280', fontSize: 12, lineHeight: 18, marginTop: 18, textAlign: 'center' },
});
