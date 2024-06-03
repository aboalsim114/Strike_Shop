import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const WelcomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Ready to start shopping? Sign up to get started.</Text>
            <Button
                mode="contained"
                onPress={() => console.log('SignUp')}
                style={styles.button}
            >
                Sign Up
            </Button>
            <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink} onPress={() => console.log('Login')}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
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
