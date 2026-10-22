import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '../auth/AuthContext';

const activities = [
  { title: 'Tugas', value: '3', caption: 'Tugas belum selesai' },
  { title: 'Jadwal', value: '2', caption: 'Mata kuliah hari ini' },
  { title: 'Absensi', value: '97%', caption: 'Semua mata kuliah' },
  { title: 'Pengumuman', value: '2', caption: 'Pengumuman baru' },
];

function toDisplayName(name) {
  return name.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function HomeScreen() {
  const { session, signOut } = useAuth();

  function confirmLogout() {
    Alert.alert('Keluar dari akun?', 'Anda perlu login kembali untuk membuka dashboard.', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/login');
          } catch (_error) {
            Alert.alert('Logout belum berhasil', 'Sesi tidak dapat dihapus. Silakan coba lagi.');
          }
        },
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileCard}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.profileImage} />
        <Text style={styles.name}>{toDisplayName(session.name)}</Text>
        <Text style={styles.email}>{session.email}</Text>
        <Pressable accessibilityRole="button" onPress={confirmLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutPressed]}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.activityGrid}>
        {activities.map((activity) => (
          <View key={activity.title} style={styles.activityCard}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityValue}>{activity.value}</Text>
            <Text style={styles.activityCaption}>{activity.caption}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { alignItems: 'center', backgroundColor: '#F0F4F8', flexGrow: 1, padding: 24 },
  profileCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.14, shadowRadius: 10, width: '100%' },
  profileImage: { borderColor: '#2563EB', borderRadius: 60, borderWidth: 4, height: 120, marginBottom: 16, width: 120 },
  name: { color: '#1F2937', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  email: { color: '#6B7280', fontSize: 14, marginTop: 6, textAlign: 'center' },
  logoutButton: { borderColor: '#DC2626', borderRadius: 10, borderWidth: 1, marginTop: 20, paddingHorizontal: 22, paddingVertical: 10 },
  logoutPressed: { backgroundColor: '#FEF2F2' },
  logoutText: { color: '#DC2626', fontSize: 15, fontWeight: '800' },
  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20, width: '100%' },
  activityCard: { backgroundColor: '#FFFFFF', borderColor: '#EDF0F4', borderRadius: 16, borderWidth: 1, elevation: 2, minHeight: 116, padding: 16, shadowColor: '#1B2535', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, width: '48%' },
  activityTitle: { color: '#3C4350', fontSize: 16, fontWeight: '700', marginBottom: 7 },
  activityValue: { color: '#2563EB', fontSize: 25, fontWeight: '800', marginBottom: 4 },
  activityCaption: { color: '#6B7280', fontSize: 12, lineHeight: 17 },
});
