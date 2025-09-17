import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function LoginScreen() {
  const { logIn } = useContext(AuthContext);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Log-In</ThemedText>
        <ThemedText>App Log-In goes here.</ThemedText>

        <Pressable style={styles.loginButton} onPress={logIn}>
          <ThemedText style={styles.loginButtonText}>Login (Test)</ThemedText>
        </Pressable>

        <ThemedView style={styles.linkContainer}>
          <ThemedText>Don't have an account? </ThemedText>
          <Link href="/sign-up">
            <ThemedText type="link">Sign-up</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
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
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});