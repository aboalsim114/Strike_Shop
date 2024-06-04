import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/Home'
import ProfileScreen from '../screens/Profile/Profile'
import LogoutScreen from '../screens/Logout/LogoutScreen'
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Logout" component={LogoutScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="logout" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
}
