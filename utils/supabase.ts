import { createClient, processLock } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';

const isSSR = typeof window === 'undefined';

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    if (isSSR) return null;
    console.debug("getItem", { key })
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    if (isSSR) return;
    return SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    if (isSSR) return;
    return SecureStore.deleteItemAsync(key)
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        