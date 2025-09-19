import { StyleSheet, TextInput, TouchableOpacity, Alert, View, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext, UserProfile } from '@/contexts/authContext';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, getUserProfile, updateUserProfile, isLoading, error } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setIsLoadingProfile(false);
      return;
    }

    setIsLoadingProfile(true);
    try {
      const profileData = await getUserProfile();
      if (profileData) {
        const fullProfile = {
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || user.email || '',
          phoneNumber: profileData.phoneNumber || '',
          country: profileData.country || '',
        };
        setProfile(fullProfile);
        setOriginalProfile(fullProfile);
      } else {
        const defaultProfile = {
          firstName: '',
          lastName: '',
          email: user.email || '',
          phoneNumber: '',
          country: '',
        };
        setProfile(defaultProfile);
        setOriginalProfile(defaultProfile);
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [user, getUserProfile]);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setIsLoadingProfile(false);
    }
  }, [user, loadProfile]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Reset editing state when screen loses focus (user navigates away)
        if (isEditing) {
          setIsEditing(false);
          if (originalProfile) {
            setProfile(originalProfile);
          }
        }
      };
    }, [isEditing, originalProfile])
  );

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      setOriginalProfile(profile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditing(false);
  };

  const updateField = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const getDisplayName = () => {
    const firstName = profile.firstName?.trim();
    const lastName = profile.lastName?.trim();
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return profile.email || 'User';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#0a7ea4', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="rgba(255,255,255,0.8)" />
          </View>
        }>

        {!isEditing && (
          <ThemedView style={styles.displayContainer}>
            {isLoadingProfile ? (
              <ThemedText type="subtitle" style={styles.displayName}>
                Loading profile...
              </ThemedText>
            ) : (
              <ThemedText type="subtitle" style={styles.displayName}>
                {getDisplayName()}
              </ThemedText>
            )}

            <ThemedView style={styles.infoSection}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <ThemedText style={styles.value}>{profile.email || 'Not provided'}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoSection}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <ThemedText style={styles.value}>
                {profile.firstName && profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Not provided'}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoSection}>
              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <ThemedText style={styles.value}>{profile.phoneNumber || 'Not provided'}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoSection}>
              <ThemedText style={styles.label}>Country</ThemedText>
              <ThemedText style={styles.value}>{profile.country || 'Not provided'}</ThemedText>
            </ThemedView>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {isEditing && (
          <ThemedView style={styles.editContainer}>
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>First Name</ThemedText>
              <TextInput
                style={styles.input}
                value={profile.firstName}
                onChangeText={(text) => updateField('firstName', text)}
                placeholder="Enter your first name"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Last Name</ThemedText>
              <TextInput
                style={styles.input}
                value={profile.lastName}
                onChangeText={(text) => updateField('lastName', text)}
                placeholder="Enter your last name"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={profile.email}
                editable={false}
                placeholder="Email address"
              />
              <ThemedText style={styles.helpText}>Email cannot be changed</ThemedText>
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
              <TextInput
                style={styles.input}
                value={profile.phoneNumber}
                onChangeText={(text) => updateField('phoneNumber', text)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Country</ThemedText>
              <TextInput
                style={styles.input}
                value={profile.country}
                onChangeText={(text) => updateField('country', text)}
                placeholder="Enter your country"
              />
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
                disabled={isLoading}
              >
                <ThemedText style={styles.saveButtonText}>
                  {isLoading ? 'Saving...' : 'Save'}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        {error && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  displayContainer: {
    alignItems: 'center',
  },
  displayName: {
    marginBottom: 30,
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  value: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  editContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
  },
  saveButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});