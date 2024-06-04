import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register/Register'
import { BackButton } from '../components/BackButton';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import Login from '../screens/Login/Login'
import TabNavigator from './TabNavigator';
import PrivateRoute from '../components/PrivateRoute';
export type RootStackParamList = {
  WelcomeScreen: undefined;
  Register: undefined;
  Login: undefined;
  HomeTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedTabs: React.FC = () => {
  return (
    <PrivateRoute>
      <TabNavigator />
    </PrivateRoute>
  );
};

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeTabs" component={AuthenticatedTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
