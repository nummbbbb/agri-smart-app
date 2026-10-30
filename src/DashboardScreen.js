import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function DashboardScreen({ user, onLogout, onOpenMap }) {
  const [stage, setStage] = useState('ทำใบอ่อน');
  const [weather, setWeather] = useState({ temp: 32, humidity: 75, wind: 12 });
  const [logs, setLogs] = useState([]);
  const [note, setNote] = useState('');
  const [cost, setCost] = useState('');

  const getWaterAdvice = () => {
    let baseWater = 120;
    if (stage === 'ทำใบอ่อน') baseWater = 100;
    if (stage === 'ออกดอก') baseWater = 60;
    if (stage === 'ขยายผล') baseWater = 150;
    if (stage === 'เก็บเกี่ยว') baseWater = 80;
    if (weather.temp > 35) baseWater += 20;
    return baseWater;
  };

  const addLog = () => {
    if (!note) return Alert.alert('กรุณากรอกกิจกรรม');
    const newEntry = { id: Date.now().toString(), note, cost: cost || '0', date: new Date().toLocaleDateString('th-TH') };
    setLogs([newEntry, ...logs]);
    setNote('');
    setCost('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>สวัสดีคุณ {user} 👋</Text>
          <Text style={styles.location}>📍 ทุเรียน อ.ท่าใหม่ จ.จันทบุรี</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity style={styles.mapBtn} onPress={onOpenMap}>
            <Text style={styles.mapBtnText}>🗺️ แผนที่</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>ออก</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>1️⃣ เลือกระยะทุเรียนในแปลง:</Text>
      <View style={styles.stageGrid}>
        {['ทำใบอ่อน', 'ออกดอก', 'ขยายผล', 'เก็บเกี่ยว'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.stageCard, stage === s && styles.stageSelected]}
            onPress={() => setStage(s)}
          >
            <Text style={[styles.stageText, stage === s && styles.stageTextSelected]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.weatherCard}>
        <Text style={styles.weatherTemp}>{weather.temp} °C 🌤️</Text>
        <Text style={styles.weatherSub}>ความชื้น: {weather.humidity}% | ลม: {weather.wind} กม./ชม.</Text>
      </View>

      <View style={styles.adviceCard}>
        <Text style={styles.adviceTitle}>💧 คำแนะนำการให้น้ำช่วงนี้ ({stage})</Text>
        <Text style={styles.adviceText}>ปริมาณน้ำที่แนะนำ: <Text style={{fontWeight:'bold', color:'#0288D1'}}>{getWaterAdvice()} ลิตร/ต้น/วัน</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>2️⃣ บันทึกกิจกรรม & ต้นทุน</Text>
      <View style={styles.logInputCard}>
        <TextInput style={styles.input} placeholder="กิจกรรม (เช่น ใส่ปุ๋ย, พ่นยา)" value={note} onChangeText={setNote} />
        <TextInput style={styles.input} placeholder="ค่าใช้จ่าย (บาท)" keyboardType="numeric" value={cost} onChangeText={setCost} />
        <TouchableOpacity style={styles.addBtn} onPress={addLog}>
          <Text style={styles.addBtnText}>+ บันทึกกิจกรรม</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logList}>
        {logs.length === 0 ? (
          <Text style={styles.emptyText}>ยังไม่มีประวัติการจดบันทึก</Text>
        ) : (
          logs.map((item) => (
            <View key={item.id} style={styles.logItem}>
              <View>
                <Text style={styles.logNote}>{item.note}</Text>
                <Text style={styles.logDate}>{item.date}</Text>
              </View>
              <Text style={styles.logCost}>-{item.cost} ฿</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 30 },
  welcome: { fontSize: 16, fontWeight: 'bold', color: '#1B5E20' },
  location: { fontSize: 12, color: '#666' },
  mapBtn: { backgroundColor: '#E1F5FE', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  mapBtnText: { color: '#0288D1', fontSize: 12, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#FFEBEE', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  logoutText: { color: '#D32F2F', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  stageGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  stageCard: { flex: 1, backgroundColor: '#FFF', padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 2, borderWidth: 1, borderColor: '#E0E0E0' },
  stageSelected: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  stageText: { fontSize: 11, color: '#444' },
  stageTextSelected: { color: '#FFF', fontWeight: 'bold' },
  weatherCard: { backgroundColor: '#0288D1', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  weatherTemp: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  weatherSub: { color: '#E1F5FE', fontSize: 13, marginTop: 5 },
  adviceCard: { backgroundColor: '#E8F5E9', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#C8E6C9', marginBottom: 20 },
  adviceTitle: { fontSize: 14, fontWeight: 'bold', color: '#2E7D32', marginBottom: 5 },
  adviceText: { fontSize: 14, color: '#333' },
  logInputCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 6, padding: 10, marginBottom: 10 },
  addBtn: { backgroundColor: '#0288D1', padding: 12, borderRadius: 6, alignItems: 'center' },
  addBtnText: { color: '#FFF', fontWeight: 'bold' },
  logList: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 30 },
  emptyText: { textAlign: 'center', color: '#999', padding: 10 },
  logItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  logNote: { fontSize: 14, fontWeight: '600', color: '#333' },
  logDate: { fontSize: 11, color: '#888' },
  logCost: { fontSize: 14, fontWeight: 'bold', color: '#D32F2F' }
});