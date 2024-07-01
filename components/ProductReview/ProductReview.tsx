import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProductReviews } from '../../store/Comments/commentsAsync';
import { Review } from '../../store/types';

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
});

export default ProductReview;
