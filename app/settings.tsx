/**
 * Settings screen - Dietary Preferences
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import { colors } from '../lib/colors';
import { loadSettings, saveSettings } from '../lib/storage';
import { typography } from '../lib/typography';
import { UserSettings } from '../types';

const SettingsScreen: React.FC = () => {
  const [dietaryPreferences, setDietaryPreferences] = useState<UserSettings>({
    noDairy: false,
    noGluten: false,
    noMeat: false,
    noNuts: false,
    noSoy: false,
    phoneNumber: '',
  });

  // Load settings on component mount
  useEffect(() => {
    loadSettingsFromStorage();
  }, []);

  const loadSettingsFromStorage = async () => {
    try {
      const settings = await loadSettings();
      setDietaryPreferences(settings);
      console.log('✅ Loaded settings from storage:', settings);
    } catch (error) {
      console.error('❌ Error loading settings:', error);
    }
  };

  const togglePreference = async (key: keyof BooleanUserSettings) => {
    const newPreferences = {
      ...dietaryPreferences,
      [key]: !dietaryPreferences[key]
    };
    
    setDietaryPreferences(newPreferences);
    
    // Save to persistent storage
    try {
      await saveSettings(newPreferences);
      console.log('✅ Saved settings to storage:', newPreferences);
    } catch (error) {
      console.error('❌ Error saving settings:', error);
    }
  };

  // Format phone number with dashes (XXX-XXX-XXXX)
  const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedDigits = digitsOnly.substring(0, 10);
    
    // Add dashes in the right places
    if (limitedDigits.length >= 6) {
      return `${limitedDigits.substring(0, 3)}-${limitedDigits.substring(3, 6)}-${limitedDigits.substring(6)}`;
    } else if (limitedDigits.length >= 3) {
      return `${limitedDigits.substring(0, 3)}-${limitedDigits.substring(3)}`;
    }
    
    return limitedDigits;
  };

  // Simple phone number validation
  const isValidPhoneNumber = (phone: string): boolean => {
    if (!phone.trim()) return true; // Empty is valid (optional field)
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has exactly 10 digits (US phone number format)
    return digitsOnly.length === 10;
  };

  const updatePhoneNumber = async (phoneNumber: string) => {
    // Only allow digits to be entered
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Format the phone number
    const formattedNumber = formatPhoneNumber(digitsOnly);
    
    const newPreferences = {
      ...dietaryPreferences,
      phoneNumber: formattedNumber
    };
    
    setDietaryPreferences(newPreferences);
    
    // Save to persistent storage
    try {
      await saveSettings(newPreferences);
      console.log('✅ Saved phone number to storage:', formattedNumber);
    } catch (error) {
      console.error('❌ Error saving phone number:', error);
    }
  };

  type BooleanUserSettings = Omit<UserSettings, 'phoneNumber'>;

  const dietaryOptions = [
    {
      key: 'noDairy' as keyof BooleanUserSettings,
      title: 'Avoid Dairy',
      emoji: '🥛',
      description: 'Avoid products containing milk, cheese, butter, or other dairy ingredients'
    },
    {
      key: 'noGluten' as keyof BooleanUserSettings,
      title: 'Avoid Gluten',
      emoji: '🌾',
      description: 'Avoid products containing wheat, barley, rye, or other gluten-containing grains'
    },
    {
      key: 'noMeat' as keyof BooleanUserSettings,
      title: 'Avoid Meat',
      emoji: '🥩',
      description: 'Avoid products containing meat, poultry, fish, or other animal proteins'
    },
    {
      key: 'noNuts' as keyof BooleanUserSettings,
      title: 'Avoid Nuts',
      emoji: '🥜',
      description: 'Avoid products containing tree nuts, peanuts, or nut-derived ingredients'
    },
    {
      key: 'noSoy' as keyof BooleanUserSettings,
      title: 'Avoid Soy',
      emoji: '🫘',
      description: 'Avoid products containing soybeans, tofu, soy sauce, or other soy-derived ingredients'
    },
  ];

  return (
    <View style={styles.container}>
      <GlobalHeader showBackButton={true} showSettingsButton={false} title="Settings" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Phone Number Section */}
        <View style={[styles.section, styles.firstSection]}>
          <Text style={styles.sectionTitle}>Phone Number</Text>
          <View style={styles.inputItem}>
            <TextInput
              style={[
                styles.phoneInput,
                dietaryPreferences.phoneNumber && !isValidPhoneNumber(dietaryPreferences.phoneNumber) && styles.phoneInputError
              ]}
              value={dietaryPreferences.phoneNumber || ''}
              onChangeText={updatePhoneNumber}
              placeholder="123-456-7890"
              placeholderTextColor={colors.text.secondary}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={12}
            />
          </View>
        </View>

        {/* Dietary Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          {dietaryOptions.map((option, index) => (
            <View key={option.key} style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>{option.emoji}</Text>
                </View>
                <View style={styles.preferenceTextContainer}>
                  <Text style={styles.preferenceLabel}>{option.title}</Text>
                  <Text style={styles.preferenceDescription}>{option.description}</Text>
                </View>
              </View>
              <Switch
                value={dietaryPreferences[option.key]}
                onValueChange={() => togglePreference(option.key)}
                trackColor={{ false: colors.text.secondary + '40', true: colors.accentBlue + '40' }}
                thumbColor={dietaryPreferences[option.key] ? colors.accentBlue : colors.text.secondary}
              />
            </View>
          ))}
        </View>

        {/* Help & Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Info</Text>
          <TouchableOpacity style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>🎨</Text>
              </View>
              <Text style={styles.infoLabel}>About the Colors</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.text.secondary} 
            />
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.appInfoSection}>
          <Text style={styles.appName}>NutriLens</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>Helping kids make safe food choices</Text>
        </View>
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
    flex: 1,
    paddingHorizontal: 20,
  },
  headerMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  firstSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    padding: 20,
    paddingBottom: 12,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.secondary + '20',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  emojiContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 20,
  },
  preferenceLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  inputItem: {
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  phoneInput: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.text.secondary + '30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.neutralBG,
    width: '100%',
  },
  phoneInputError: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  appInfoSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default SettingsScreen;
