import { supabase } from '@/utils/supabase';
import { Alert } from 'react-native';

export async function SignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    }