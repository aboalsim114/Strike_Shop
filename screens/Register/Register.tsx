import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Register: React.FC = () => {
    const handleRegister = (values: any) => {
        // Handle registration logic here
        console.log(values);
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />

                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <Button title="Register" onPress={handleRegister} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Register;