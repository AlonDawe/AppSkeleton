import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

function CustomDrawerContent(props: any) {
    const colorScheme = useColorScheme();

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20 }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors[colorScheme ?? 'light'].text,
                    marginBottom: 20
                }}>
                    Menu
                </Text>
            </View>
            <DrawerItem
                label="Home"
                onPress={() => router.push('/(drawer)/(tabs)')}
                activeTintColor={Colors[colorScheme ?? 'light'].tint}
                inactiveTintColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
            <DrawerItem
                label="Profile"
                onPress={() => router.push('/(drawer)/(tabs)/profile')}
                activeTintColor={Colors[colorScheme ?? 'light'].tint}
                inactiveTintColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
            <DrawerItem
                label="Settings"
                onPress={() => router.push('/(drawer)/(tabs)/settings')}
                activeTintColor={Colors[colorScheme ?? 'light'].tint}
                inactiveTintColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
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
