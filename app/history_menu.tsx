/**
 * History screen showing previously scanned products
 */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import { colors } from '../lib/colors';
import { loadHistory, removeFromHistory } from '../lib/storage';
import { typography } from '../lib/typography';
import { HistoryItem } from '../types';

const HistoryScreen: React.FC = () => {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history on mount
  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const historyData = await loadHistory();
        setHistory(historyData);
        console.log(`✅ Loaded ${historyData.length} items from history`);
      } catch (error) {
        console.error('❌ Error loading history:', error);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoryData();
  }, []);

  const handleItemPress = (item: HistoryItem) => {
    // Navigate to product detail screen
    router.push('/product-detail');
  };

  const handleDeleteItem = async (item: HistoryItem) => {
    try {
      await removeFromHistory(item.id);
      setHistory(prev => prev.filter(h => h.id !== item.id));
      console.log(`✅ Removed item ${item.name} from history`);
    } catch (error) {
      console.error('❌ Error removing item from history:', error);
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


  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemDate}>
            {formatDate(item.scannedAt)}
          </Text>
          <Text style={[
            styles.compatibilityStatus,
            { color: getCompatibilityColor(item.verdict) }
          ]}>
            {getCompatibilityText(item.verdict)}
          </Text>
        </View>
        
        <View style={styles.itemRight}>
          <Text style={styles.dietaryTag}>
            {getDietaryTag(item.verdict)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <GlobalHeader showBackButton={true} title="History" />
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading your scan history...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GlobalHeader showBackButton={true} title="History" />
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>No scans yet</Text>
            <Text style={styles.emptySubtext}>Scan some products to see them here!</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralBG,
    paddingTop: 15,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listContainer: {
    flexGrow: 1,
    padding: 20,
  },
  historyItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  compatibilityStatus: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  dietaryTag: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
});

export default HistoryScreen;