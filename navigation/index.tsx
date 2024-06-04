import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register/Register'
import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
export type RootStackParamList = {
  WelcomeScreen: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
