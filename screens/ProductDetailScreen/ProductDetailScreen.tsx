import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image , Text,Dimensions} from 'react-native';
import {  Title, Button, Paragraph } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProductById } from '../../store/Products/productAsync';
import { fetchCategories } from '../../store/Category/categoryAsync';
import { RootStackParamList } from '../../navigation/index';
import ProductReview from '../../components/ProductReview/ProductReview';
import Markdown from 'react-native-markdown-display';
import AddReview from '../../components/AddReview/AddReview';

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
                <Markdown >{product.description}</Markdown>
                <Paragraph style={styles.price}>Price: ${product.price}</Paragraph>
                <Paragraph style={styles.category}>Category: {categoryName}</Paragraph>
                <Paragraph style={{...styles.stock, color: product.stock ? 'green' : 'red'}}>
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                </Paragraph>
            </View>
            <View>
                <AddReview productId={productId} />
              <ProductReview productId={productId} />
            </View>
        </ScrollView>
    );
};

const markdownStyles = {
    body: {
        fontSize: 16,
        color: '#555',
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    heading2: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    heading3: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    strong: {
        fontWeight: 'bold',
    },
    em: {
        fontStyle: 'italic',
    },
    listUnorderedItem: {
        fontSize: 16,
    },
    listOrderedItem: {
        fontSize: 16,
    },
    blockquote: {
        paddingLeft: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#d0d0d0',
        fontStyle: 'italic',
    },
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        height: Dimensions.get('window').width * 0.5, 
        resizeMode: 'contain', 
    },
    content: {
        marginTop: 16,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
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
