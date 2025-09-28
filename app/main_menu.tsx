import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import { colors } from '../lib/colors';
import { loadHistory } from '../lib/storage';
import { HistoryItem } from '../types';


const HomeScreen: React.FC = () => {
  const [recentScans, setRecentScans] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadRecentScans = async () => {
      try {
        const history = await loadHistory();
        setRecentScans(history.slice(0, 3)); // Show only the 3 most recent scans
      } catch (error) {
        console.error('Error loading recent scans:', error);
        setRecentScans([]);
      }
    };

    loadRecentScans();
  }, []);

  const getCompatibilityText = (verdict: 'Good' | 'Caution' | 'Avoid') => {
    switch (verdict) {
      case 'Good': return 'Compatible';
      case 'Caution': return 'Caution';
      case 'Avoid': return 'Avoid';
      default: return 'Unknown';
    }
  };

  const getCompatibilityColor = (verdict: 'Good' | 'Caution' | 'Avoid') => {
    switch (verdict) {
      case 'Good': return colors.accentBlue;
      case 'Caution': return colors.warnYellow;
      case 'Avoid': return colors.error;
      default: return colors.text.secondary;
    }
  };

  const getDietaryTag = (verdict: 'Good' | 'Caution' | 'Avoid') => {
    switch (verdict) {
      case 'Good': return 'Healthy';
      case 'Caution': return 'Check';
      case 'Avoid': return 'Warning';
      default: return 'Unknown';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <View style={styles.container}>
      <GlobalHeader title="Home" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
      <Text style={styles.headerSubtitle}>
        Scan any packaged food to get detailed nutrition info and personalized health warnings
      </Text>

      {/* Buttons Row */}
      <View style={styles.cardRow}>
        <Link href="/scanner" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="camera" size={32} color={colors.accentBlue} />
            <Text style={styles.cardTitle}>Scan Food</Text>
            <Text style={styles.cardSubtitle}>Use camera</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/search" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="search" size={32} color={colors.accentBlue} />
            <Text style={styles.cardTitle}>Search</Text>
            <Text style={styles.cardSubtitle}>Find products</Text>
          </TouchableOpacity>
        </Link>
      </View>


      {/* Recent Scans */}
      <Link href="/history_menu" asChild>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <Text style={styles.sectionSubtitle}>Your latest food analysis</Text>
          
          {recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <View key={scan.id} style={styles.scanCard}>
                <View style={styles.scanCardContent}>
                  <View style={styles.scanCardInfo}>
                    <Text style={styles.scanCardTitle}>{scan.name}</Text>
                    <Text style={styles.scanCardBrand}>{formatDate(scan.scannedAt)}</Text>
                    <Text style={[
                      styles.scanCardCompatibility,
                      { color: getCompatibilityColor(scan.verdict) }
                    ]}>
                      {getCompatibilityText(scan.verdict)}
                    </Text>
                  </View>
                  <View style={styles.scanCardRight}>
                    <Text style={styles.scanCardTag}>{getDietaryTag(scan.verdict)}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyScansCard}>
              <Text style={styles.emptyScansText}>No scans yet</Text>
              <Text style={styles.emptyScansSubtext}>Scan some products to see them here!</Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralBG,
    paddingTop: 15,
  },
  content: {
    padding: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 20,
    marginTop: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  scanCard: {
    backgroundColor: colors.neutralBG,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scanCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  scanCardInfo: {
    flex: 1,
  },
  scanCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  scanCardBrand: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  scanCardCompatibility: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accentBlue,
  },
  scanCardRight: {
    alignItems: 'flex-end',
  },
  scanCardTag: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  emptyScansCard: {
    backgroundColor: colors.neutralBG,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  emptyScansText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyScansSubtext: {
    color: colors.text.secondary,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;