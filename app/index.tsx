import { useRouter } from 'expo-router';
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Test Data, delete later
export interface User {
  id: number;
  email: string;
  password: string; // can be plain text or bcrypt hash
}

export const users: User[] = [
  { id: 1, email: 'alice@example.com', password: 'password123' },
  { id: 2, email: 'bob@example.com', password: 'mypassword' },
  { id: 3, email: 'a', password: 'b' },
];

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful!', user);
      router.replace('/main_menu');
    } else {
      console.log('Invalid email or password');
      alert('Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardView}
      >
        <View style={styles.contentCard}>
          {/* App Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>NutriLens+</Text>
          </View>

          {/* Login Form */}
          <View style={styles.loginSection}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#8B4513"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#8B4513"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Policy */}
          <View style={styles.privacySection}>
            <View style={styles.privacyCheckbox}>
              <View style={styles.checkboxIcon}>
                <Text style={styles.checkboxText}>✓</Text>
              </View>
              <Text style={styles.privacyText}>
                I have read and agree to the <Text style={styles.privacyLink}>Privacy Policy</Text>
              </Text>
              <Text style={styles.globeIcon}>🌐</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8DC", // solid cream color
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    fontStyle: 'italic',
  },
  loginSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D2691E',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#D2B48C', // Tan color
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  privacySection: {
    alignItems: 'center',
  },
  privacyCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  privacyText: {
    fontSize: 12,
    color: '#666',
  },
  privacyLink: {
    textDecorationLine: 'underline',
    color: '#8B4513',
  },
  globeIcon: {
    fontSize: 12,
    marginLeft: 5,
  },
});