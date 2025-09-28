import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Product } from '../types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleScanFood = () => {
    (navigation as any).navigate('Scan');
  };

  const handleSearch = () => {
    (navigation as any).navigate('Search');
  };

  const handleRecentScanPress = (product: Product) => {
    (navigation as any).navigate('ProductDetail', { product });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.headerTitle}>🍎 Make Healthier Food Choices 🍉</Text>
      <Text style={styles.headerSubtitle}>
        Scan any packaged food to get detailed nutrition info and personalized health warnings
      </Text>

      {/* Buttons Row */}
      <View style={styles.cardRow}>
        <TouchableOpacity style={[styles.card, styles.scanCard]} onPress={handleScanFood}>
          <Ionicons name="camera" size={32} color="#FF7043" />
          <Text style={styles.cardTitle}>Scan Food</Text>
          <Text style={styles.cardSubtitle}>Use camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.searchCard]} onPress={handleSearch}>
          <Ionicons name="search" size={32} color="#42A5F5" />
          <Text style={styles.cardTitle}>Search</Text>
          <Text style={styles.cardSubtitle}>Find products</Text>
        </TouchableOpacity>
      </View>

      {/* Health Journey */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Your Health Journey</Text>
        <Text style={styles.sectionSubtitle}>Track your progress this month</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="trending-up" size={20} color="#FF7043" />
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Foods Scanned</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="shield-checkmark" size={20} color="#66BB6A" />
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Warnings Avoided</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="star" size={20} color="#FFD54F" />
            <Text style={styles.statNumber}>89%</Text>
            <Text style={styles.statLabel}>Healthy Choices</Text>
          </View>
        </View>
      </View>

      {/* Recent Scans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕑 Recent Scans</Text>
        <Text style={styles.sectionSubtitle}>Your latest food analysis</Text>
        
        <TouchableOpacity 
          style={styles.scanItem}
          onPress={() => handleRecentScanPress({
            id: '1',
            name: 'Organic Granola Bar',
            brand: 'Nature Valley',
            barcode: '123',
            ingredients: [],
          })}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.scanTitle}>🌾 Organic Granola Bar</Text>
            <Text style={styles.scanSubtitle}>Nature Valley • 2 hours ago</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#81C784' }]}>
            <Text style={styles.badgeText}>A</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.scanItem}
          onPress={() => handleRecentScanPress({
            id: '2',
            name: 'Greek Yogurt',
            brand: 'Chobani',
            barcode: '456',
            ingredients: [],
          })}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.scanTitle}>🥛 Greek Yogurt</Text>
            <Text style={styles.scanSubtitle}>Chobani • 1 day ago</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#4FC3F7' }]}>
            <Text style={styles.badgeText}>A+</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.scanItem}
          onPress={() => handleRecentScanPress({
            id: '3',
            name: 'Instant Ramen',
            brand: 'Maruchan',
            barcode: '789',
            ingredients: [],
          })}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.scanTitle}>🍜 Instant Ramen</Text>
            <Text style={styles.scanSubtitle}>Maruchan • 2 days ago</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E57373' }]}>
            <Text style={styles.badgeText}>D</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7', // soft pastel yellow background
  },
  content: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FF7043', // playful orange
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6D4C41',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#FFF',
  },
  scanCard: {
    backgroundColor: '#FFECB3', // pastel orange-yellow
  },
  searchCard: {
    backgroundColor: '#B3E5FC', // pastel blue
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  scanTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  scanSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default HomeScreen;