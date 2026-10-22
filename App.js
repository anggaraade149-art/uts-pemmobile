import { StatusBar } from 'expo-status-bar';
import {  
  View,  
  Text,  
  Image,  
  StyleSheet,  
  TouchableOpacity,  
  Alert,  
  ScrollView, 
  Dimensions  
} from "react-native"; 

const { width } = Dimensions.get("window"); 

const activities = [
  { title: 'Tugas', value: '3', caption: 'Tugas belum selesai' },
  { title: 'Jadwal', value: '2', caption: 'Mata Kuliah hari ini' },
  { title: 'Absensi', value: '97%', caption: 'semua mata kuliah' },
  { title: 'Pengumuman', value: '2', caption: 'Pengumuman baru' },
];

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}> 
      <View style={styles.container}> 
        <Image 
          source={{ 
            uri: "https://i.pravatar.cc/150?img=68", 
          }} 
        style={styles.profileImage} 
        /> 
 
        <Text style={styles.name}>Muhammad Ade Anggara</Text> 
      </View> 

        <View style={styles.box}>
         <View style={styles.activityGrid}>
          {activities.map((activity) => (
            <View key={activity.title} style={styles.activityCard}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityValue}>{activity.value}</Text>
              <Text style={styles.activityCaption}>{activity.caption}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({ 
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingVertical: 30, 
    backgroundColor: "#f0f4f8",
  }, 
  container: { 
    width: width * 0.9, 
    backgroundColor: "#fff", 
    borderRadius: 20, 
    padding: 20, 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 5 }, 
    shadowRadius: 10, 
    elevation: 5, 
  }, 

  box: {
    padding: 10,
    marginBottom: 20,
  },

  profileImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    borderWidth: 4, 
    borderColor: "#007AFF",
    marginBottom: 20, 
  }, 
  name: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 10, 
    textAlign: "center", 
  }, 

  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600", 
  }, 
  activityGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    rowGap: 14 },

  activityCard: {
    backgroundColor: '#FFFFFF', 
    borderColor: '#EDF0F4', 
    borderRadius: 16, 
    borderWidth: 1,
    elevation: 3, 
    minHeight: 116, 
    padding: 16, 
    shadowColor: '#1B2535', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, 
    shadowRadius: 4, 
    width: '48%',
  },

  activityTitle: { 
    color: '#3C4350', 
    fontSize: 16, 
    fontWeight: '600',
    marginBottom: 7 },

  activityValue: { 
    color: '#2563EB', 
    fontSize: 25, 
    fontWeight: '700', 
    marginBottom: 4 },

  activityCaption: { 
    color: '#8C929D', 
    fontSize: 12 },
}); 
