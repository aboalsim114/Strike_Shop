import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProductReviews } from '../../store/Comments/commentsAsync';
import { Review } from '../../store/types';
import { FontAwesome } from '@expo/vector-icons';

interface ProductReviewProps {
    productId: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { reviews, loading, error } = useSelector((state: RootState) => state.comments);

    useEffect(() => {
        dispatch(fetchProductReviews(productId));
    }, [dispatch, productId]);

    if (loading) {
        return <Text>Loading reviews...</Text>;
    }

    if (error) {
        return <Text>Error loading reviews: {error}</Text>;
    }

    if (reviews.length === 0) {
        return <Text>No reviews available</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {reviews.map((review: Review) => (
                <Card key={review.id} style={styles.reviewCard}>
                    <View style={styles.header}>
                        <Avatar.Image size={44} source={{ uri:  'https://via.placeholder.com/150' }} style={styles.avatar} />
                        <View style={styles.headerText}>
                            <Text style={styles.username}>{review.username}</Text>
                        </View>
                    </View>
                  
                    <Text style={styles.comment}>{review.comment}</Text>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    reviewCard: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        marginRight: 15,
    },
    headerText: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    comment: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default ProductReview;
