import { StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function SignupScreen() {
  const { signUp, error, clearError } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    // Basic validation
    if (!firstName.trim()) {
      alert('Please enter your first name');
      return;
    }

    if (!lastName.trim()) {
      alert('Please enter your last name');
      return;
    }

    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      alert('Please enter your password');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (!confirmPassword.trim()) {
      alert('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password, firstName, lastName);
    } catch (error) {
      // Error is already handled in the context
      console.log('Sign up failed:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>
          <ThemedText type="title">Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>
        <ThemedView style={styles.formContainer}>
          {error && (
            <ThemedView style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          )}

          <ThemedView style={styles.inputContainer}>
            <IconSymbol name="person" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (error) clearError();
              }}
              autoComplete="given-name"
              placeholderTextColor="#666"
            />
          </ThemedView>

          <ThemedView style={styles.lastNameContainer}>
            <IconSymbol name="person" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (error) clearError();
              }}
              autoComplete="family-name"
              placeholderTextColor="#666"
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <IconSymbol name="envelope" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                if (error) clearError();
              }}
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#666"
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <IconSymbol name="lock" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) clearError();
              }}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              placeholderTextColor="#666"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <IconSymbol
                name={showPassword ? "eye.slash" : "eye"}
                size={20}
                color="#666"
              />
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <IconSymbol name="lock" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (error) clearError();
              }}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
              placeholderTextColor="#666"
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
              <IconSymbol
                name={showConfirmPassword ? "eye.slash" : "eye"}
                size={20}
                color="#666"
              />
            </Pressable>
          </ThemedView>

          <Pressable style={styles.signupButton} onPress={handleSignup}>
            <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
          </Pressable>

          </ThemedView>

          <ThemedView style={styles.linkContainer}>
            <ThemedText>Already have an account? </ThemedText>
            <Link href="/log-in">
              <ThemedText type="link">Log-in</ThemedText>
            </Link>
          </ThemedView>
        </ThemedView>
      </ScrollView>

      <Link href="/modal" style={styles.privacyLink}>
        <ThemedText type="link">Privacy Policy</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  privacyLink: {
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  lastNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  icon: {
    marginRight: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
  eyeButton: {
    padding: 5,
  },
});