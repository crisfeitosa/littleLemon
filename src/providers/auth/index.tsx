import {createContext, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChildrenProps} from '../../@types/children';
import { FormSignInProps } from '@screens/SignIn';

interface AuthState {
  isLoading: boolean;
  isOnboardingCompleted: boolean;
}

// Define AuthAction type
interface AuthAction {
  type: string;
  isOnboardingCompleted?: boolean;
  isLoading?: boolean;
}

// Define the structure of AuthContext
interface AuthContextProps {
  state: AuthState;
  authActions: {
    onboard: (data: any) => Promise<void>;
    checkOnboard: () => Promise<void>;
    logout: () => Promise<void>;
    setLoading: (isLoading: boolean) => void;
  };
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Action types
const authActionTypes = {
  ONBOARD: 'ONBOARD',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState: AuthState = {
  isLoading: true,
  isOnboardingCompleted: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case authActionTypes.ONBOARD:
      return {
        ...state,
        isOnboardingCompleted: action.isOnboardingCompleted || false,
        isLoading: false,
      };
    case authActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading || false,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authActions = useMemo(() => ({
    onboard: async (data: FormSignInProps) => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('profile', jsonValue);
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted: true });
      } catch (e) {
        console.error('Error at authContext onboard:', e);
      }
    },
    checkOnboard: async () => {
      try {
        const getUserProfile = await AsyncStorage.getItem('profile');
        const isOnboardingCompleted = getUserProfile !== null;
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted });
      } catch (e) {
        console.error('Error retrieving onboarding status:', e);
      } finally {
        dispatch({ type: authActionTypes.SET_LOADING, isLoading: false });
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('profile');
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted: false });
      } catch (e) {
        console.error('Error at authContext logout:', e);
      }
    },
    setLoading: (isLoading: boolean) => {
      dispatch({ type: authActionTypes.SET_LOADING, isLoading });
    },
  }),[]);

  const contextValue = useMemo(() => ({
    state,
    authActions,
  }), [state, authActions]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

