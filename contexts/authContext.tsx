import {createContext, PropsWithChildren, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email address is already registered. Please use a different email or try logging in.';
        case 'auth/weak-password':
            return 'Password is too weak. Please choose a stronger password.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please check your credentials and try again.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection and try again.';
        default:
            return 'An error occurred. Please try again.';
    }
};

type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    logIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logOut: () => Promise<void>;
    clearError: () => void;
    error: string | null;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    logIn: async () => {},
    signUp: async () => {},
    logOut: async () => {},
    clearError: () => {},
    error: null,
});

export function AuthProvider({ children }: PropsWithChildren ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const storeAuthState = async (newState: {isLoggedIn: boolean}) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, jsonValue);

        } catch (error) {
            console.log("Error saving the isLoggedIn state in persistent storage: ",error);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const logIn = async (email: string, password: string) => {
        try {
            setError(null);
            setIsLoading(true);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsLoggedIn(true);

        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code));
            console.log('Login error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            setError(null);
            setIsLoading(true);

            // 1. Create Firebase user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Save additional profile data to Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: new Date()
            });

            setUser(userCredential.user);
            setIsLoggedIn(true);

        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code));
            console.log('Sign up error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logOut = async () => {
        try {
            setError(null);
            setIsLoading(true);

            await signOut(auth);
            setUser(null);
            setIsLoggedIn(false);

        } catch (error: any) {
            setError(error.message);
            console.log('Logout error:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        });

        return unsubscribe; // Cleanup listener on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logIn, signUp, logOut, clearError, error }}>
            {children}
        </AuthContext.Provider>
    );
}