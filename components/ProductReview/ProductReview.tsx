import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';

const reviews = [
    {
        id: 1,
        username: "JohnDoe92",
        date: "2023-06-25",
        avatarUrl: "https://via.placeholder.com/150",
        comment: "Great product! Really helped me in my daily tasks.",
        helpfulCount: 15
    },
    {
        id: 2,
        username: "JaneSmith",
        date: "2023-06-20",
        avatarUrl: "https://via.placeholder.com/150",
        comment: "Not what I expected, but it works okay.",
        helpfulCount: 5
    }
];

export default function ProductReview() {
    return (
        <ScrollView style={styles.container}>
            {reviews.map((review) => (
                <Card key={review.id} style={styles.reviewCard}>
                    <View style={styles.header}>
                        <Avatar.Image size={44} source={{ uri: review.avatarUrl }} style={styles.avatar} />
                        <View style={styles.headerText}>
                            <Text style={styles.username}>{review.username}</Text>
                            <Text style={styles.date}>{review.date}</Text>
                        </View>
                    </View>
                    <Text style={styles.comment}>{review.comment}</Text>
                  
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    reviewCard: {
        marginBottom: 16,
        padding: 15,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        marginRight: 10
    },
    headerText: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    comment: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        lineHeight: 24  // This improves readability
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    report: {
        color: '#FF6347',
        fontWeight: 'bold'
    },
    helpfulButton: {
        backgroundColor: '#f0f0f0'  // A light background for the button
    }
});
