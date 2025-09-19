import { StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {useContext, useState} from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function LoginScreen() {
  const { logIn, error, isLoading, clearError } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Basic validation
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

    try {
      await logIn(email, password);
    } catch (error) {
      // Error is already handled in the context
      console.log('Login failed:', error);
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
          <ThemedText type="title">Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>

          <ThemedView style={styles.formContainer}>
            {error && (
              <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>{error}</ThemedText>
              </ThemedView>
            )}

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
                secureTextEntry
                autoComplete="current-password"
                placeholderTextColor="#666"
              />
            </ThemedView>

            <Pressable style={styles.loginButton} onPress={handleLogin}>
              <ThemedText style={styles.loginButtonText}>Log-in</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.linkContainer}>
            <ThemedText>Don't have an account? </ThemedText>
            <Link href="/sign-up">
              <ThemedText type="link">Sign-up</ThemedText>
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
  loginButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
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
});