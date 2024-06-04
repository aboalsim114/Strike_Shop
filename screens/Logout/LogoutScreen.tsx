import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/Auth/AuthSlices/login';

const LogoutScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(resetState());
        navigation.navigate('WelcomeScreen');
    }, [dispatch, navigation]);

    return (
        <View style={styles.container}>
            <Text>You have been logged out.</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogoutScreen;
