import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppData,
  Patient,
  TherapySession,
  ScaleResult,
  ThoughtRecord,
  ActivityRecord,
  TherapistProfile,
} from './types';

const STORAGE_KEY = '@tcc_clinica_data';

const initialState: AppData = {
  therapist: null,
  patients: [],
  sessions: [],
  scaleResults: [],
  thoughtRecords: [],
  activityRecords: [],
};

type Action =
  | { type: 'LOAD_DATA'; payload: AppData }
  | { type: 'SET_THERAPIST'; payload: TherapistProfile }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'DELETE_PATIENT'; payload: string }
  | { type: 'ADD_SESSION'; payload: TherapySession }
  | { type: 'UPDATE_SESSION'; payload: TherapySession }
  | { type: 'ADD_SCALE_RESULT'; payload: ScaleResult }
  | { type: 'ADD_THOUGHT_RECORD'; payload: ThoughtRecord }
  | { type: 'UPDATE_THOUGHT_RECORD'; payload: ThoughtRecord }
  | { type: 'ADD_ACTIVITY'; payload: ActivityRecord }
  | { type: 'UPDATE_ACTIVITY'; payload: ActivityRecord };

function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case 'LOAD_DATA':
      return action.payload;
    case 'SET_THERAPIST':
      return { ...state, therapist: action.payload };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return { ...state, patients: state.patients.map((p) => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter((p) => p.id !== action.payload),
        sessions: state.sessions.filter((s) => s.patientId !== action.payload),
        scaleResults: state.scaleResults.filter((r) => r.patientId !== action.payload),
        thoughtRecords: state.thoughtRecords.filter((t) => t.patientId !== action.payload),
        activityRecords: state.activityRecords.filter((a) => a.patientId !== action.payload),
      };
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.payload] };
    case 'UPDATE_SESSION':
      return { ...state, sessions: state.sessions.map((s) => s.id === action.payload.id ? action.payload : s) };
    case 'ADD_SCALE_RESULT':
      return { ...state, scaleResults: [...state.scaleResults, action.payload] };
    case 'ADD_THOUGHT_RECORD':
      return { ...state, thoughtRecords: [...state.thoughtRecords, action.payload] };
    case 'UPDATE_THOUGHT_RECORD':
      return { ...state, thoughtRecords: state.thoughtRecords.map((t) => t.id === action.payload.id ? action.payload : t) };
    case 'ADD_ACTIVITY':
      return { ...state, activityRecords: [...state.activityRecords, action.payload] };
    case 'UPDATE_ACTIVITY':
      return { ...state, activityRecords: state.activityRecords.map((a) => a.id === action.payload.id ? action.payload : a) };
    default:
      return state;
  }
}

interface DataContextValue {
  data: AppData;
  dispatch: React.Dispatch<Action>;
  saveData: (newState: AppData) => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppData;
        dispatch({ type: 'LOAD_DATA', payload: parsed });
      }
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = useCallback(async (newState: AppData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }, []);

  // Auto-save whenever data changes
  useEffect(() => {
    if (!isLoading) {
      saveData(data);
    }
  }, [data, isLoading, saveData]);

  return (
    <DataContext.Provider value={{ data, dispatch, saveData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

// Helpers
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateShort(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
