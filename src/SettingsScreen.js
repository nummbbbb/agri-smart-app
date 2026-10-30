import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function SettingsScreen({ onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ ตั้งค่าระบบ</Text>
      <Text style={styles.subtitle}>จัดการข้อมูลผู้ใช้งานและแปลงเกษตร</Text>

      <View style={styles.card}>
        <Text style={styles.menuItem}>🔔 ตั้งค่าการแจ้งเตือนรดน้ำ</Text>
        <Text style={styles.menuItem}>📍 แก้ไขพิกัดแปลงหลัก (อ.ท่าใหม่)</Text>
        <Text style={styles.menuItem}>🌐 ภาษา (ภาษาไทย)</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginTop: 30 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 20 },
  menuItem: { fontSize: 15, color: '#333', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  logoutBtn: { backgroundColor: '#FFEBEE', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#FFCDD2' },
  logoutText: { color: '#D32F2F', fontSize: 15, fontWeight: 'bold' }
});