import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ForecastScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌤️ พยากรณ์อากาศ & เตือนภัย</Text>
      <Text style={styles.subtitle}>อำเภอท่าใหม่ จังหวัดจันทบุรี</Text>

      {/* กล่องเตือนภัยทางการเกษตร */}
      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>⚠️ ประกาศเตือนภัยช่วงนี้</Text>
        <Text style={styles.alertText}>- ระวังโรครากเน่าโคนเน่า เนื่องจากฝนตกชุกสะสมในพื้นที่</Text>
        <Text style={styles.alertText}>- เฝ้าระวังการระบาดของเพลี้ยไก่แจ้ในระยะแทงใบอ่อน</Text>
      </View>

      {/* พยากรณ์ราย 3 วัน */}
      <Text style={styles.sectionTitle}>📅 พยากรณ์อากาศ 3 วันล่วงหน้า</Text>
      
      {['วันนี้ (มีเมฆบางส่วน)', 'พรุ่งนี้ (มีโอกาสฝนฟ้าคะนอง 40%)', 'มะรืนนี้ (อากาศแจ่มใส)'].map((day, index) => (
        <View key={index} style={styles.forecastItem}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.tempText}>32°C / 25°C 🌧️</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginTop: 30 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  alertCard: { backgroundColor: '#FFEBEE', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FFCDD2', marginBottom: 20 },
  alertTitle: { fontSize: 15, fontWeight: 'bold', color: '#C62828', marginBottom: 8 },
  alertText: { fontSize: 13, color: '#B71C1C', marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  forecastItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  dayText: { fontSize: 14, color: '#333', fontWeight: '500' },
  tempText: { fontSize: 14, fontWeight: 'bold', color: '#0288D1' }
});