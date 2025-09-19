import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Pressable } from 'react-native';

function CustomDrawerContent(props: any) {
    const colorScheme = useColorScheme();
    const { logOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <ThemedView style={{ padding: 20 }}>
                <ThemedText style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 20
                }}>
                    Menu
                </ThemedText>
            </ThemedView>
            <Pressable style={styles.drawerItem} onPress={() => router.push('/(drawer)/(tabs)')}>
                <IconSymbol name="house.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
                <ThemedText style={styles.drawerLabel}>Home</ThemedText>
            </Pressable>

            <Pressable style={styles.drawerItem} onPress={() => router.push('/(drawer)/(tabs)/profile')}>
                <IconSymbol name="person.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
                <ThemedText style={styles.drawerLabel}>Profile</ThemedText>
            </Pressable>

            <Pressable style={styles.drawerItem} onPress={() => router.push('/(drawer)/(tabs)/settings')}>
                <IconSymbol name="gearshape.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
                <ThemedText style={styles.drawerLabel}>Settings</ThemedText>
            </Pressable>

            <Pressable style={styles.drawerItem} onPress={logOut}>
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#ff3b30" />
                <ThemedText style={[styles.drawerLabel, { color: '#ff3b30' }]}>Sign Out</ThemedText>
            </Pressable>
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    const colorScheme = useColorScheme();

    return (
        <Drawer
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                drawerInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: 'Main App',
                    title: 'Main App'
                }}
            />
        </Drawer>
    );
}

const styles = {
    drawerItem: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 2,
    },
    drawerLabel: {
        marginLeft: 12,
        fontSize: 16,
    },
};
