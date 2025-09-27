/**
 * Home screen showing product details and verdict
 */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import EmptyState from '../components/EmptyState';
import IngredientList from '../components/IngredientList';
import OwlMascot from '../components/OwlMascot';
import VerdictBadge from '../components/VerdictBadge';
import { useSettings } from '../context/SettingsContext';
import { colors } from '../lib/colors';
import { addToHistory } from '../lib/storage';
import { typography } from '../lib/typography';
import { analyzeProduct, getOwlMood } from '../lib/verdict';
import { OwlMood, Product, Verdict } from '../types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { settings } = useSettings();
  const [product, setProduct] = useState<Product | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  // Analyze product when it changes
  useEffect(() => {
    if (product) {
      const analysis = analyzeProduct(product, settings);
      setVerdict(analysis);
    }
  }, [product, settings]);

  // Get owl mood from verdict
  const owlMood: OwlMood = verdict ? getOwlMood(verdict.productVerdict) : 'happy';

  const handleScanAgain = () => {
    (navigation as any).navigate('Scan');
  };

  const handleSaveToHistory = async () => {
    if (!product || !verdict) return;

    try {
      const historyItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        verdict: verdict.productVerdict,
        scannedAt: new Date(),
      };

      await addToHistory(historyItem);
      
      Alert.alert(
        'Saved!',
        'Product added to your history.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to save to history. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleWhatThisMeans = () => {
    Alert.alert(
      'What the Colors Mean',
      '🟢 Green: Safe ingredients that won\'t upset your tummy\n🟡 Yellow: Check with a grown-up first\n🔴 Red: Avoid these ingredients',
      [{ text: 'Got it!' }]
    );
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Ready to Scan!"
          message="Point me at a barcode to see if it's safe for you!"
          mood="happy"
        />
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={handleScanAgain}
        >
          <Ionicons name="camera" size={24} color={colors.text.inverse} />
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Product Header */}
      <View style={styles.productHeader}>
        <View style={styles.productImageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/120x120/36C090/FFFFFF?text=Product' }}
            style={styles.productImage}
            defaultSource={{ uri: 'https://via.placeholder.com/120x120/F7F7FA/718096?text=No+Image' }}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          {verdict && (
            <VerdictBadge verdict={verdict.productVerdict} size="large" />
          )}
        </View>
      </View>

      {/* Owl Mascot */}
      {verdict && (
        <OwlMascot 
          mood={owlMood} 
          message={verdict.summaryLine} 
        />
      )}

      {/* Ingredients */}
      {verdict && (
        <IngredientList 
          ingredients={verdict.perIngredientFlags}
          title="Ingredients"
        />
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleScanAgain}
        >
          <Ionicons name="camera" size={20} color={colors.text.inverse} />
          <Text style={styles.primaryButtonText}>Scan Again</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleSaveToHistory}
        >
          <Ionicons name="bookmark" size={20} color={colors.accentBlue} />
          <Text style={styles.secondaryButtonText}>Save to History</Text>
        </TouchableOpacity>
      </View>

      {/* Help Link */}
      <TouchableOpacity 
        style={styles.helpLink}
        onPress={handleWhatThisMeans}
      >
        <Text style={styles.helpLinkText}>What do the colors mean?</Text>
        <Ionicons name="help-circle-outline" size={16} color={colors.accentBlue} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralBG,
  },
  content: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    marginRight: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: typography.lineHeight.tight * typography.fontSize.xl,
  },
  productBrand: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentBlue,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.accentBlue,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  secondaryButtonText: {
    color: colors.accentBlue,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: 8,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentBlue,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 40,
    minHeight: 48,
  },
  scanButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: 8,
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  helpLinkText: {
    color: colors.accentBlue,
    fontSize: typography.fontSize.sm,
    marginRight: 4,
  },
});

export default HomeScreen;
