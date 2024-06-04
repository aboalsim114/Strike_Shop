import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Button, Text, Title, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
                    <Title style={styles.name}>Anna Avetisyan</Title>
                </View>
                <View style={styles.infoSection}>
                    <TextInput
                        label="Full Name"
                        value="Anna Avetisyan"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Birthday"
                        value="Birthday"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="calendar" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Phone"
                        value="818 123 4567"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="phone" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Instagram Account"
                        value="Instagram account"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="instagram" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Email"
                        value="info@aplusdesign.co"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="email" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                    <TextInput
                        label="Password"
                        value="Password"
                        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="eye" size={24} />} />}
                        style={styles.input}
                        editable={false}
                    />
                </View>
                <Button mode="contained" style={styles.editButton}>
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
        color: '#fff',
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
