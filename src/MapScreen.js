import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  // ตั้งค่าพิกัดเริ่มต้นให้อยู่ที่ อ.ท่าใหม่ จ.จันทบุรี
  const [region, setRegion] = useState({
    latitude: 12.6114,
    longitude: 102.1553,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // พิกัดหมุดแปลงทุเรียนที่ผู้ใช้เลือกล่าสุด
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 12.6114,
    longitude: 102.1553,
  });

  // เมื่อผู้ใช้แตะลงบนแผนที่เพื่อเลือกตำแหน่ง
  const handleMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setSelectedLocation(coords);
  };

  const handleSaveLocation = () => {
    Alert.alert(
      'บันทึกตำแหน่งสำเร็จ! 📍',
      `บันทึกพิกัดแปลงทุเรียน อ.ท่าใหม่ เรียบร้อย\nLat: ${selectedLocation.latitude.toFixed(4)}\nLon: ${selectedLocation.longitude.toFixed(4)}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ เลือกตำแหน่งแปลงทุเรียน</Text>
        <Text style={styles.subtitle}>แตะบนแผนที่ในเขต อ.ท่าใหม่ จ.จันทบุรี เพื่อปักหมุด</Text>
      </View>

      {/* ตัวแผนที่ Interactive */}
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="แปลงทุเรียนของคุณ"
            description="พิกัดสำหรับคำนวณสภาพอากาศและน้ำ"
            pinColor="#2E7D32"
          />
        )}
      </MapView>

      {/* แถบแสดงพิกัดที่เลือกและปุ่มบันทึก */}
      <View style={styles.footerCard}>
        <View style={styles.coordInfo}>
          <Text style={styles.coordLabel}>พิกัดที่เลือกปัจจุบัน:</Text>
          <Text style={styles.coordValue}>
            Lat: {selectedLocation.latitude.toFixed(5)} | Lon: {selectedLocation.longitude.toFixed(5)}
          </Text>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveLocation}>
          <Text style={styles.saveBtnText}>📌 บันทึกพิกัดแปลงนี้</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { paddingHorizontal: 15, paddingTop: 40, paddingBottom: 10, backgroundColor: '#F8F9FA' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  map: { flex: 1, width: '100%' },
  footerCard: {
    padding: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5,
  },
  coordInfo: { marginBottom: 10 },
  coordLabel: { fontSize: 12, color: '#888' },
  coordValue: { fontSize: 14, fontWeight: 'bold', color: '#2E7D32', marginTop: 2 },
  saveBtn: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
});