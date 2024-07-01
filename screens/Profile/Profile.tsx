import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Avatar, Button, Text, Title, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserProfile, updateUserProfile } from '../../store/Auth/authAsync';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.profile);
    const { tokens } = useSelector((state: RootState) => state.auth);
    const [image, setImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedUser, setEditedUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
    });

    useEffect(() => {
        if (tokens?.access) {
            dispatch(fetchUserProfile(tokens.access));
        }
    }, [dispatch, tokens]);

    useEffect(() => {
        if (user) {
            setEditedUser({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleEditToggle = () => {
        if (isEditing && tokens?.access) {
            // Submit the changes
            dispatch(updateUserProfile({ token: tokens.access, userData: editedUser }))
                .unwrap()
                .then(() => {
                    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
                    setIsEditing(false);
                })
                .catch((err) => {
                    Alert.alert('Update Failed', 'Failed to update profile.');
                });
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setEditedUser({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
            });
        }
    };

    const handleChange = (name: string, value: string) => {
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                    <Avatar.Image 
                        size={120} 
                        source={{ uri: image || user.avatar || 'https://via.placeholder.com/150' }} 
                        style={styles.avatar} 
                    />
                    <Button onPress={pickImage} mode="contained" style={styles.uploadButton}>
                        Upload Image
                    </Button>
                    <Title style={styles.name}>{user.first_name} {user.last_name}</Title>
                </View>
                <View style={styles.infoSection}>
                    <TextInput
                        label="First Name"
                        value={editedUser.first_name}
                        onChangeText={(text) => handleChange('first_name', text)}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} color="#6200ee" />} />}
                        style={styles.input}
                        editable={isEditing}
                    />
                    <TextInput
                        label="Last Name"
                        value={editedUser.last_name}
                        onChangeText={(text) => handleChange('last_name', text)}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} color="#6200ee" />} />}
                        style={styles.input}
                        editable={isEditing}
                    />
                    <TextInput
                        label="Username"
                        value={editedUser.username}
                        onChangeText={(text) => handleChange('username', text)}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} color="#6200ee" />} />}
                        style={styles.input}
                        editable={isEditing}
                    />
                    <TextInput
                        label="Email"
                        value={editedUser.email}
                        onChangeText={(text) => handleChange('email', text)}
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="email" size={24} color="#6200ee" />} />}
                        style={styles.input}
                        editable={isEditing}
                    />
                </View>
                <Button mode="contained" style={styles.editButton} onPress={handleEditToggle}>
                    {isEditing ? 'Submit' : 'Edit Profile'}
                </Button>
                {isEditing && (
                    <Button mode="outlined" style={styles.cancelButton} onPress={handleCancel}>
                        Cancel
                    </Button>
                )}
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
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 10,
        elevation: 3,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#6200ee',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6200ee',
        marginTop: 16,
    },
    infoSection: {
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    editButton: {
        marginTop: 24,
        backgroundColor: '#6200ee',
        borderRadius: 8,
        paddingVertical: 10,
    },
    cancelButton: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 10,
    },
    uploadButton: {
        marginTop: 16,
        backgroundColor: '#03a9f4',
        borderRadius: 8,
        paddingVertical: 6,
    },
});

export default Profile;
