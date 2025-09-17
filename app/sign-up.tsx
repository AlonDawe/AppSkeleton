import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SignupScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Sign-Up</ThemedText>
        <ThemedText>App Sign-Up goes here.</ThemedText>
        <ThemedView style={styles.linkContainer}>
          <ThemedText>Already have an account? </ThemedText>
          <Link href="/log-in">
            <ThemedText type="link">Log-in</ThemedText>
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
});