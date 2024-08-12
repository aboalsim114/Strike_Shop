import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register/Register';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import Login from '../screens/Login/Login';
import TabNavigator from './TabNavigator';
import PrivateRoute from '../components/PrivateRoute';
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import { IconButton, Badge } from 'react-native-paper';
import PanierScreen from '../screens/Panier/Panier';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';

export type RootStackParamList = {
    WelcomeScreen: undefined;
    Register: undefined;
    Login: undefined;
    HomeTabs: undefined;
    ProductDetail: { productId: string };
    Panier: undefined;
    PaymentScreen: undefined;
    OrdersScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedTabs: React.FC = () => {
    return (
        <PrivateRoute>
            <TabNavigator />
        </PrivateRoute>
    );
};

const CartIconWithBadge = ({ navigation }: any) => {
    const { items } = useSelector((state: RootState) => state.cart);
    const itemCount = items.length;

    return (
        <View style={styles.iconContainer}>
            <IconButton 
                icon="cart" 
                onPress={() => navigation.navigate('Panier')}
            />
            {itemCount > 0 && (
                <Badge style={styles.badge}>{itemCount}</Badge>
            )}
        </View>
    );
};

const OrdersIcon = ({ navigation }: any) => {
    return (
        <View style={styles.iconContainer}>
            <IconButton 
                icon="clipboard-list"  // Utilisation d'une icône pour les commandes
                onPress={() => navigation.navigate('OrdersScreen')}
            />
        </View>
    );
};

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Panier" component={PanierScreen} options={{ headerTitle: "Panier" }} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerTitle: "PaymentScreen" }} />
                <Stack.Screen 
                    name="HomeTabs" 
                    component={AuthenticatedTabs} 
                    options={({ navigation }) => ({
                        headerLeft: () => <OrdersIcon navigation={navigation} />,
                        headerRight: () => <CartIconWithBadge navigation={navigation} />,
                        headerTitle: '',
                        headerTintColor: '#fff',
                    })} 
                />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerTitle: "" }} />
                <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerTitle: "Mes Commandes" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
});

export default RootStack;
