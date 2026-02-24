import { AppButton } from '@/components/appButton';
import { supabase } from '@/utils/supabase';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen( {navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUp() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Register account</Text>
            <TextInput style={styles.textInputBox} placeholder={"Email"} onChangeText={setEmail}></TextInput>
            <TextInput style={styles.textInputBox} placeholder={"Password"} onChangeText={setPassword}></TextInput>
            <TextInput style={styles.textInputBox} placeholder={"Re-enter password"}></TextInput>
            <AppButton onPress={signUp} label="Register account" icon={<MaterialIcons name="person" size={width * 0.07} color="white"/>}/>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F7F4E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
        headerText: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
    },
        textInputBox: {
        borderColor: 'black',
        width: width * 0.6,
        height: height * 0.05,
        borderWidth: 1,
        margin: height * 0.005,
        padding: 15,
    },
})