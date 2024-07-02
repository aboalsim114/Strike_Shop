// src/components/AddReview/AddReview.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addProductReview } from '../../store/Comments/commentsAsync';
import { AddReviewPayload } from '../../store/types';

interface AddReviewProps {
    productId: string;
}

const AddReview: React.FC<AddReviewProps> = ({ productId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [comment, setComment] = useState('');
    const { user } = useSelector((state: RootState) => state.auth);

    const handleAddReview = () => {
        if (comment.trim() === '') {
            Alert.alert('Error', 'Comment cannot be empty');
            return;
        }

        if (!user) {
            Alert.alert('Error', 'User not logged in');
            return;
        }

        const newReview: AddReviewPayload = {
            comment,
            product_id: productId,
            user_id: user.id,
        };

        dispatch(addProductReview(newReview))
            .unwrap()
            .then(() => {
                Alert.alert('Success', 'Review added successfully');
                setComment('');
            })
            .catch((err) => {
                Alert.alert('Error', `Failed to add review: ${err}`);
            });
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Add a Review</Title>
            <TextInput
                label="Your Review"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                style={styles.textInput}
                mode="outlined"
            />
            <Button mode="contained" onPress={handleAddReview} style={styles.button}>
                Submit
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textInput: {
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6200ee',
    },
});

export default AddReview;
