import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addProductToCart } from '../../store/Panier/cartAsync';

interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
        return description;
    }
    return description.slice(0, maxLength) + '...';
};

const Product: React.FC<ProductProps> = ({ id, name, description, price, image }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        console.log('Image URL:', image);
    }, [image]);

    const handleAddToCart = () => {
        if (user?.id) {
            dispatch(addProductToCart({ user_id: user.id, product_id: id }));
        } else {
            console.error('User not logged in');
        }
    };

    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: id })}>
                <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.description}>{truncateDescription(description, 100)}</Text>
                <View style={styles.buttonContainer}>
                    <Button mode="outlined" onPress={() => navigation.navigate('ProductDetail', { productId: id })} style={styles.button}>
                        See Details
                    </Button>
                    <Button mode="contained" onPress={handleAddToCart} style={[styles.button, styles.addToCartButton]}>
                        Add to Cart
                    </Button>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
        backgroundColor: '#FFF'
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    content: {
        padding: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    price: {
        fontSize: 16,
        color: '#03a9f4',
        fontWeight: 'bold',
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
    addToCartButton: {
        backgroundColor: '#f0c14b', // Amazon's button color
        borderColor: '#a88734' // Border color similar to Amazon's
    }
});

export default Product;
