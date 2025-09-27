/**
 * Search screen for finding products
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import VerdictBadge from '../components/VerdictBadge';
import { useSettings } from '../context/SettingsContext';
import { useProducts } from '../hooks/useProducts';
import { colors } from '../lib/colors';
import { typography } from '../lib/typography';
import { analyzeProduct } from '../lib/verdict';
import { Product } from '../types';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { settings } = useSettings();
  const { searchQuery, setSearchQuery, filteredProducts } = useProducts();

  const handleProductPress = (product: Product) => {
    // Navigate to home screen with product
    (navigation as any).navigate('Home', { product });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const verdict = analyzeProduct(item, settings);
    
    return (
      <TouchableOpacity 
        style={styles.productItem}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.productImageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/60x60/36C090/FFFFFF?text=Product' }}
            style={styles.productImage}
            defaultSource={{ uri: 'https://via.placeholder.com/60x60/F7F7FA/718096?text=No+Image' }}
          />
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productBrand} numberOfLines={1}>
            {item.brand}
          </Text>
        </View>
        
        <View style={styles.verdictContainer}>
          <VerdictBadge verdict={verdict.productVerdict} size="small" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (searchQuery.trim()) {
      return (
        <EmptyState
          title="No Products Found"
          message="Hoot! Try another word or check your spelling."
          mood="concerned"
        />
      );
    }
    
    return (
      <EmptyState
        title="Search Products"
        message="Type a product name to find what you're looking for!"
        mood="happy"
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products..."
        onClear={handleClearSearch}
      />
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
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
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    minHeight: 80,
  },
  productImageContainer: {
    marginRight: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  productBrand: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  verdictContainer: {
    marginLeft: 12,
  },
});

export default SearchScreen;
