// src/components/CategoryList.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Title, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchCategories } from '../store/Category/categoryAsync';

const CategoryList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.categories}>
            <Title style={styles.categoryTitle}>Choisissez une catégorie</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
                {categories && categories.map((category, index) => (
                    <View key={index} style={styles.category}>
                        <Avatar.Image size={50} source={{ uri: 'https://via.placeholder.com/50' }} />
                        <Button>{category.name}</Button>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categories: {
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categoryScrollView: {
        flexDirection: 'row',
    },
    category: {
        alignItems: 'center',
        marginRight: 16,
    },
});

export default CategoryList;
