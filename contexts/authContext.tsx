import {createContext, PropsWithChildren, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    logIn: () => void;
    logOut: () => void;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    logIn: () => {},
    logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const storeAuthState = async (newState: {isLoggedIn: boolean}) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, jsonValue);

        } catch (error) {
            console.log("Error saving the isLoggedIn state in persistent storage: ",error);
        }
    };

    const logIn= () => {
        setIsLoggedIn(true);
        storeAuthState({ isLoggedIn: true });
    };
    const logOut= () => {
        setIsLoggedIn(false);
        storeAuthState({ isLoggedIn: false });
    };

    useEffect(() => {
        const getAuthFromStorage = async () => {
            try {
                const value = await AsyncStorage.getItem(authStorageKey);
                if (value !== null) {
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                }
            } catch (error) {
                console.log("Error fetching auth from persistent storage: ", error);
            }
            setIsLoading(false);
        }
        getAuthFromStorage();

    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}