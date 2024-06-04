import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import { RootState } from '../store/store';

const PrivateRoute = ({ children }: any) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const loading = useSelector((state: RootState) => state.auth.loading);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Unauthorized - Please log in</Text>
            </View>
        );
    }

    return children;
};

export default PrivateRoute;
