import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

//Test Data, delete later
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

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <View style={styles.backgroundGradient}>
          {/* Checkered Pattern Background */}
          <View style={styles.checkeredPattern} />
          
          {/* Main Content Card */}
          <View style={styles.contentCard}>
            {/* Done Button (top right) */}
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            {/* App Title with Watermelon Mascot */}
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>NutriLens+</Text>
              <View style={styles.watermelonMascot}>
                <View style={styles.watermelonBody}>
                  <View style={styles.watermelonStripe1} />
                  <View style={styles.watermelonStripe2} />
                  <View style={styles.watermelonStripe3} />
                  <View style={styles.watermelonStripe4} />
                  <View style={styles.watermelonStripe5} />
                  <View style={styles.watermelonStripe6} />
                  <View style={styles.watermelonStripe7} />
                  <View style={styles.watermelonStripe8} />
                  
                  {/* Face */}
                  <View style={styles.watermelonEyeLeft}>
                    <Text style={styles.eyeText}>{'>'}</Text>
                  </View>
                  <View style={styles.watermelonEyeRight}>
                    <Text style={styles.eyeText}>{'●'}</Text>
                  </View>
                  <View style={styles.watermelonMouth}>
                    <Text style={styles.mouthText}>{'<'}</Text>
                  </View>
                  
                  {/* Highlights */}
                  <View style={styles.watermelonHighlight1} />
                  <View style={styles.watermelonHighlight2} />
                </View>
              </View>
            </View>

            {/* How to Play Section */}
            <View style={styles.howToPlaySection}>
              <View style={styles.howToPlayBanner}>
                <Text style={styles.howToPlayText}>How to play</Text>
              </View>
              <View style={styles.instructionCard}>
                <Text style={styles.instructionText}>
                  This is an app where you scan food products to check if they're safe for your dietary restrictions and earn points for making healthy choices.
                </Text>
              </View>
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

              <TouchableOpacity style={styles.gameStartButton} onPress={handleLogin}>
                <Text style={styles.gameStartButtonText}>Game Start</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.scoreRankingButton}>
                <Text style={styles.scoreRankingButtonText}>Score Ranking</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.customizeButton}>
                <Text style={styles.customizeButtonText}>Customize</Text>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8DC",
  },
  keyboardView: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  checkeredPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF8DC',
    opacity: 0.3,
    // Create checkered pattern with multiple views
  },
  contentCard: {
    flex: 1,
    margin: 20,
    backgroundColor: '#FFF8DC',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  doneButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    textShadowColor: '#8B4513',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  watermelonMascot: {
    position: 'absolute',
    top: -10,
    right: -20,
  },
  watermelonBody: {
    width: 60,
    height: 60,
    backgroundColor: '#228B22',
    borderRadius: 30,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#000',
  },
  watermelonStripe1: {
    position: 'absolute',
    top: 8,
    left: 5,
    right: 5,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe2: {
    position: 'absolute',
    top: 15,
    left: 3,
    right: 3,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe3: {
    position: 'absolute',
    top: 22,
    left: 4,
    right: 4,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe4: {
    position: 'absolute',
    top: 29,
    left: 2,
    right: 2,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe5: {
    position: 'absolute',
    top: 36,
    left: 3,
    right: 3,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe6: {
    position: 'absolute',
    top: 43,
    left: 4,
    right: 4,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe7: {
    position: 'absolute',
    top: 50,
    left: 2,
    right: 2,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonStripe8: {
    position: 'absolute',
    top: 57,
    left: 3,
    right: 3,
    height: 3,
    backgroundColor: '#32CD32',
    borderRadius: 1.5,
  },
  watermelonEyeLeft: {
    position: 'absolute',
    top: 20,
    left: 15,
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermelonEyeRight: {
    position: 'absolute',
    top: 20,
    right: 15,
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermelonMouth: {
    position: 'absolute',
    top: 35,
    left: 26,
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  mouthText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  watermelonHighlight1: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    opacity: 0.8,
  },
  watermelonHighlight2: {
    position: 'absolute',
    top: 12,
    left: 10,
    width: 6,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    opacity: 0.6,
  },
  howToPlaySection: {
    marginBottom: 30,
  },
  howToPlayBanner: {
    backgroundColor: '#D2691E',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 15,
  },
  howToPlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  instructionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
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
  gameStartButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  gameStartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  scoreRankingButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  scoreRankingButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  customizeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  customizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
})
