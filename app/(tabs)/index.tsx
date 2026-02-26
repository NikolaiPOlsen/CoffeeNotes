import { HomeScreen } from '@/app/(tabs)/homeScreen';
import { NewNoteScreen } from "@/app/(tabs)/newNoteScreen";
import { SplashScreenController } from '@/components/splash-screen-controller';
import { useAuthContext } from '@/hooks/use-auth-context';
import AuthProvider from '@/providers/auth-provider';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import UserScreen from '../user';
import LoginScreen from './login';
import RegisterScreen from './register';
import StartScreen from './start';

const Stack = createNativeStackNavigator();

function Navigator() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack.Navigator initialRouteName="Start">
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="New Note" component={NewNoteScreen} options={{ headerBackTitle: 'Back', headerStyle: { backgroundColor: '#F7F4E1' }, headerTintColor: 'black' }}/>
          <Stack.Screen name="User" component={UserScreen} options={{ headerBackTitle: 'Back', headerStyle: { backgroundColor: '#F7F4E1' }, headerTintColor: 'black',
  }}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerBackTitle: 'Back', headerStyle: { backgroundColor: '#F7F4E1' }, headerTintColor: 'black' }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerBackTitle: 'Back', headerStyle: { backgroundColor: '#F7F4E1' }, headerTintColor: 'black' }}/>
        </>
      )}
    </Stack.Navigator>
  );
}

const app = () => {
  return (
    <AuthProvider>
      <MenuProvider>
      <SplashScreenController />
      <Navigator />
      <StatusBar style="auto" />
      <SplashScreenController />
      </MenuProvider>
    </AuthProvider>
  );
}

export default app;