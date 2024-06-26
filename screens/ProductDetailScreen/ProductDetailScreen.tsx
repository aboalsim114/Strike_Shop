import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProductById } from '../../store/Products/productAsync';
import { fetchCategories } from '.../../store/Category/categoryAsync';
import { RootStackParamList } from '../../navigation/index';

const ProductDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
    const navigation = useNavigation();
    const { productId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading, error } = useSelector((state: RootState) => state.productDetail);
    const { categories } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchProductById(productId));
        dispatch(fetchCategories());
    }, [dispatch, productId]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (!product) {
        return <Text>No product found</Text>;
    }

    const category = categories?.find((cat) => cat.id === product.category_id);
    const categoryName = category ? category.name : 'Unknown';

    const imageUrl = `${product.image}`;

    return (
        <ScrollView contentContainerStyle={styles.container}>
          
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
            <View style={styles.content}>
                <Title style={styles.productTitle}>{product.name}</Title>
                <Paragraph style={styles.description}>{product.description}</Paragraph>
                <Paragraph style={styles.price}>Price: ${product.price}</Paragraph>
                <Paragraph style={styles.category}>Category: {categoryName}</Paragraph>
                <Paragraph style={{...styles.stock, color: product.stock ? 'green' : 'red'}}>
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                </Paragraph>
            
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
   productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,  
    resizeMode: 'cover'  
},

    content: {
        marginTop: 16,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff5722',
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        marginBottom: 16,
    },
    stock: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default ProductDetailScreen;
