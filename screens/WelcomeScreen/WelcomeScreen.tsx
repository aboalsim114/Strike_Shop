import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Logo from "../../assets/media/logo.png";
import { AppDispatch } from '../../store/store';
import { login } from '../../store/Auth/authAsync';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const WelcomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, tokens, error, loading } = useSelector((state: RootState) => state.auth);

    const handleLogin = (values: { username: string; password: string }) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (isAuthenticated && tokens.access) {
            navigation.navigate('HomeTabs')
        }
    }, [isAuthenticated, tokens, navigation]);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome</Text>
            <Image source={Logo} style={styles.image} />
            <Text style={styles.subtitle}>Ready to start shopping? Sign up to get started.</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Register')}
                style={styles.button}
            >
                Sign Up
            </Button>
            <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width: '100%',
        paddingVertical: 5,
    },
    loginText: {
        marginTop: 20,
        fontSize: 14,
        color: '#888',
    },
    loginLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
