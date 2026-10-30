import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/LoginScreen';
import DashboardScreen from './src/DashboardScreen';
import MapScreen from './src/MapScreen';
import ForecastScreen from './src/ForecastScreen';
import SettingsScreen from './src/SettingsScreen';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' | 'map' | 'forecast' | 'settings'

  if (!currentUser) {
    return <LoginScreen onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ส่วนแสดงเนื้อหาตาม Tab ที่เลือก */}
      <View style={{ flex: 1 }}>
        {currentTab === 'dashboard' && (
          <DashboardScreen 
            user={currentUser} 
            onLogout={() => setCurrentUser(null)} 
            onOpenMap={() => setCurrentTab('map')} 
          />
        )}
        {currentTab === 'map' && <MapScreen />}
        {currentTab === 'forecast' && <ForecastScreen />}
        {currentTab === 'settings' && <SettingsScreen onLogout={() => setCurrentUser(null)} />}
      </View>

      {/* Tab Bar เมนูด้านล่างสุด */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'dashboard' && styles.activeTab]} 
          onPress={() => setCurrentTab('dashboard')}
        >
          <Text style={[styles.tabText, currentTab === 'dashboard' && styles.activeTabText]}>📊 แดชบอร์ด</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'map' && styles.activeTab]} 
          onPress={() => setCurrentTab('map')}
        >
          <Text style={[styles.tabText, currentTab === 'map' && styles.activeTabText]}>🗺️ แผนที่</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'forecast' && styles.activeTab]} 
          onPress={() => setCurrentTab('forecast')}
        >
          <Text style={[styles.tabText, currentTab === 'forecast' && styles.activeTabText]}>🌤️ พยากรณ์</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'settings' && styles.activeTab]} 
          onPress={() => setCurrentTab('settings')}
        >
          <Text style={[styles.tabText, currentTab === 'settings' && styles.activeTabText]}>⚙️ ตั้งค่า</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', height: 60, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#DDD', elevation: 10 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeTab: { backgroundColor: '#E8F5E9', borderTopWidth: 2, borderTopColor: '#2E7D32' },
  tabText: { fontSize: 12, color: '#666', fontWeight: '600' },
  activeTabText: { color: '#2E7D32', fontWeight: 'bold' }
});