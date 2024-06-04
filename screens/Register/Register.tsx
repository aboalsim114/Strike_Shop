import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Wavify from 'react-wavify';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register: React.FC = ({ navigation }: any) => {
    const handleRegister = (values: any) => {

    };

    return (
        <View style={styles.container}>
            <Avatar.Icon size={64} icon="account" style={styles.avatar} />
            <Title style={styles.title}>Let's Get Started!</Title>
            <Text style={styles.subtitle}>Create an account to get all features</Text>
            <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            label="Name"
                            mode="outlined"
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={touched.name && !!errors.name}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            label="Email"
                            mode="outlined"
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={touched.email && !!errors.email}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}


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

                        <TextInput
                            label="Confirm Password"
                            mode="outlined"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            error={touched.confirmPassword && !!errors.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                        <Button mode="contained" onPress={handleRegister} style={styles.button}>
                            CREATE
                        </Button>
                    </View>
                )}
            </Formik>
            <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkText} onPress={() => navigation.navigate('Login')}>Login here</Text></Text>
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
    loginLink: {
        textAlign: 'center',
        marginTop: 16,
    },
    loginLinkText: {
        color: '#0000EE',
    },
});

export default Register;
