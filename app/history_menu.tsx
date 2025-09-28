/**
 * History screen showing previously scanned products
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import EmptyState from '../components/EmptyState';
import GlobalHeader from '../components/GlobalHeader';
import VerdictBadge from '../components/VerdictBadge';
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
      } catch (error) {
        console.warn('Failed to load history:', error);
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

  const handleDeleteItem = (item: HistoryItem) => {
    Alert.alert(
      'Delete Item',
      `Remove "${item.name}" from your history?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFromHistory(item.id);
              setHistory(prev => prev.filter(h => h.id !== item.id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item. Please try again.');
            }
          }
        }
      ]
    );
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
        </View>
        
        <View style={styles.itemActions}>
          <VerdictBadge verdict={item.verdict} size="small" />
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <EmptyState
      title="No History Yet"
      message="Scan some products to see them here!"
      mood="happy"
    />
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <GlobalHeader showBackButton={true} title="History" />
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading your history...</Text>
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
        ListEmptyComponent={renderEmptyState}
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  itemDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 8,
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    textAlign: 'center',
  },
});

export default HistoryScreen;