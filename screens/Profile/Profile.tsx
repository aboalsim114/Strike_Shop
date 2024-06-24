import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Button, Text, Title, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserProfile } from '../../store/Auth/authAsync';

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.profile);
    const { tokens } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (tokens?.access) {
            console.log('Fetching user profile with token:', tokens.access);
            dispatch(fetchUserProfile(tokens.access));
        }
    }, [dispatch, tokens]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        console.log('Profile fetch error:', error);
        return <Text>Error: {error}</Text>;
    }

    if (!user) {
        return <Text>No user data available</Text>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Avatar.Image size={100} source={{ uri: user.avatar || 'https://via.placeholder.com/150' }} style={styles.avatar} />
                    <Title style={styles.name}>{user.first_name} {user.last_name}</Title>
                </View>
                <View style={styles.infoSection}>
                    <TextInput
                        label="Full Name"
                        value={`${user.first_name} ${user.last_name}`}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Username"
                        value={user.username || ''}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Email"
                        value={user.email || ''}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="email" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                </View>
                <Button mode="contained" style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                    Edit Profile
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#000',
    },
    infoSection: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    editButton: {
        marginTop: 24,
    },
});

export default Profile;
