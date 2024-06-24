import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register } from '../../store/Auth/authAsync'; 

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
});

const Register: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.register);

    const handleRegister = (values: any) => {
        dispatch(register(values));
    };

    React.useEffect(() => {
        if (isSuccess) {
            navigation.navigate('Login');
            
        }
    }, [isSuccess]);

    return (
        <View style={styles.container}>
            <Avatar.Icon size={64} icon="account" style={styles.avatar} />
            <Title style={styles.title}>Let's Get Started!</Title>
            <Text style={styles.subtitle}>Create an account to get all features</Text>
            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '', first_name: '', last_name: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
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
                            label="First Name"
                            mode="outlined"
                            style={styles.input}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                            error={touched.first_name && !!errors.first_name}
                        />
                        {touched.first_name && errors.first_name && <Text style={styles.error}>{errors.first_name}</Text>}

                        <TextInput
                            label="Last Name"
                            mode="outlined"
                            style={styles.input}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                            error={touched.last_name && !!errors.last_name}
                        />
                        {touched.last_name && errors.last_name && <Text style={styles.error}>{errors.last_name}</Text>}

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

                        {isError && <Text style={styles.error}>{errorMessage}</Text>}

                        <Button mode="contained" onPress={handleSubmit as any} style={styles.button} loading={isLoading} disabled={isLoading}>
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
