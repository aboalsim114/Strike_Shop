import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register/Register';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import Login from '../screens/Login/Login';
import TabNavigator from './TabNavigator';
import PrivateRoute from '../components/PrivateRoute';
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import { IconButton } from 'react-native-paper';
import PanierScreen from '../screens/Panier/Panier';

export type RootStackParamList = {
    WelcomeScreen: undefined;
    Register: undefined;
    Login: undefined;
    HomeTabs: undefined;
    ProductDetail: { productId: string };
    Panier: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedTabs: React.FC = () => {
    return (
        <PrivateRoute>
            <TabNavigator />
        </PrivateRoute>
    );
};

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Panier" component={PanierScreen} options={{headerTitle: "Panier"}} />
                <Stack.Screen 
                    name="HomeTabs" 
                    component={AuthenticatedTabs} 
                    options={({ navigation }) => ({
                        headerLeft: () => null,
                        headerRight: () => (
                            <IconButton 
                                icon="cart" 
                                onPress={() => navigation.navigate('Panier')}
                            />
                        ),
                        headerTitle: '',
                        headerTintColor: '#fff',
                    })} 
                />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerTitle: "" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
