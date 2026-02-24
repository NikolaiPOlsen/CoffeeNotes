import { AppButton } from '@/components/appButton';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartScreen( {navigation} ) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.herotitle}>FastNotes</Text>
            <Text style={styles.subherotitle}>Your easy to use notes app</Text>

            <View style={ styles.space}>
                <AppButton onPress={() => navigation.navigate("Login")} label="Login" icon={<MaterialIcons name="person" size={width * 0.07} color="white"/>}/>
            </View>
            <View style={ styles.space}>
                <AppButton onPress={() => navigation.navigate("Register")} label="Create Account" icon={<MaterialIcons name="person" size={width * 0.07} color="white"/>}/>
            </View>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F4E1',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    herotitle: {
        fontSize: width * 0.12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subherotitle: {
        fontSize: width * 0.05,
        textAlign: 'center'
    },
    space: {
        marginTop: height * 0.01,
    }
})