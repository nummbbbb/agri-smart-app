import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 AgriSmart</Text>
      <Text style={styles.subtitle}>ระบบบริหารจัดการสวนทุเรียน อ.ท่าใหม่</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ชื่อผู้ใช้งาน</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกชื่อผู้ใช้"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกรหัสผ่าน"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4F8', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 25 },
  card: { width: '100%', backgroundColor: '#FFF', borderRadius: 12, padding: 20, elevation: 4 },
  label: { fontSize: 14, color: '#333', marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});