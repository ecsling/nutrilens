/**
 * SMS Service for sending notifications to parents
 */
import * as SMS from 'expo-sms';
import { Alert } from 'react-native';

export interface SMSMessage {
  productName: string;
  verdict: 'Good' | 'Caution' | 'Avoid';
  dietaryRestriction?: string;
  compatibilityScore?: number;
  barcode?: string;
}

/**
 * Send SMS notification to parent about product scan
 */
export const sendProductNotification = async (
  phoneNumber: string,
  message: SMSMessage
): Promise<boolean> => {
  try {
    // Check if SMS is available on the device
    const isAvailable = await SMS.isAvailableAsync();
    
    if (!isAvailable) {
      Alert.alert(
        'SMS Not Available',
        'SMS is not available on this device. Please check your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Format the SMS message
    const smsText = formatSMSMessage(message);

    // Send the SMS - this will open the native SMS app with pre-filled message
    const { result } = await SMS.sendSMSAsync([phoneNumber], smsText);

    if (result === 'sent') {
      Alert.alert(
        'Message Sent!',
        `SMS notification sent to ${phoneNumber}`,
        [{ text: 'OK' }]
      );
      return true;
    } else {
      Alert.alert(
        'Message Not Sent',
        'The SMS could not be sent. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    Alert.alert(
      'Error',
      'There was an error sending the SMS. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};

/**
 * Format the SMS message based on product scan results
 */
const formatSMSMessage = (message: SMSMessage): string => {
  const { productName, verdict, dietaryRestriction, compatibilityScore, barcode } = message;
  
  let smsText = `🍎 NutriLens Scan Alert 🍎\n\n`;
  smsText += `Product: ${productName}\n`;
  
  if (barcode) {
    smsText += `Barcode: ${barcode}\n`;
  }
  
  // Add verdict with emoji
  const verdictEmoji = verdict === 'Good' ? '✅' : verdict === 'Caution' ? '⚠️' : '❌';
  smsText += `Verdict: ${verdictEmoji} ${verdict}\n`;
  
  // Add dietary restriction info if available
  if (dietaryRestriction && compatibilityScore !== undefined) {
    smsText += `\n${dietaryRestriction} Compatibility: ${compatibilityScore}%\n`;
  }
  
  // Add action recommendation
  if (verdict === 'Good') {
    smsText += `\n✅ This product is safe for your child!`;
  } else if (verdict === 'Caution') {
    smsText += `\n⚠️ Please review ingredients before allowing your child to consume this product.`;
  } else {
    smsText += `\n❌ This product may not be suitable for your child. Please check ingredients.`;
  }
  
  smsText += `\n\nScanned with NutriLens - Keeping kids safe! 👶`;
  
  return smsText;
};

/**
 * Send a simple "Ask Mom" message
 */
export const sendAskMomMessage = async (phoneNumber: string, productName: string): Promise<boolean> => {
  try {
    const isAvailable = await SMS.isAvailableAsync();
    
    if (!isAvailable) {
      Alert.alert(
        'SMS Not Available',
        'SMS is not available on this device.',
        [{ text: 'OK' }]
      );
      return false;
    }

    const smsText = `🍎 NutriLens - Ask Mom 🍎\n\nYour child is asking about:\n"${productName}"\n\nPlease check if this product is safe for them to eat.\n\nSent from NutriLens 👶`;

    const { result } = await SMS.sendSMSAsync([phoneNumber], smsText);

    if (result === 'sent') {
      Alert.alert(
        'Message Sent!',
        `"Ask Mom" message sent to ${phoneNumber}`,
        [{ text: 'OK' }]
      );
      return true;
    } else {
      Alert.alert(
        'Message Not Sent',
        'The SMS could not be sent. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  } catch (error) {
    console.error('Error sending Ask Mom SMS:', error);
    Alert.alert(
      'Error',
      'There was an error sending the message. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};
