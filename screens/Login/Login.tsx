import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Text, Title, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/Auth/authAsync';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const { width } = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, tokens, error, loading } = useSelector((state: RootState) => state.auth);

    const handleLogin = (values: { username: string; password: string }) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (isAuthenticated && tokens.access) {
            navigation.navigate('WelcomeScreen')
        }
    }, [isAuthenticated, tokens, navigation]);

    return (
        <View style={styles.container}>
            <Avatar.Icon size={64} icon="account" style={styles.avatar} />
            <Title style={styles.title}>Welcome Back!</Title>
            <Text style={styles.subtitle}>Log in to your account</Text>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            label="Username"
                            mode="outlined"
                            style={styles.input}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            error={touched.username && !!errors.username}
                        />
                        {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

                        <TextInput
                            label="Password"
                            mode="outlined"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={touched.password && !!errors.password}
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <Button mode="contained" onPress={handleSubmit as any} style={styles.button}>
                            LOG IN
                        </Button>
                    </View>
                )}
            </Formik>
            <Text style={styles.signupLink}>Don't have an account? <Text style={styles.signupLinkText} onPress={() => console.log('Sign Up')}>Sign up here</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    avatar: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 16,
    },
    button: {
        marginTop: 16,
    },
    signupLink: {
        textAlign: 'center',
        marginTop: 16,
    },
    signupLinkText: {
        color: '#0000EE',
    },
});

export default Login;
