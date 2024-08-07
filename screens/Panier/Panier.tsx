import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ImageBackground , Dimensions} from 'react-native';
import { Text, Title, Button, Card, IconButton, Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchCartItems, deleteCartItem } from '../../store/Panier/cartAsync';
import { Cart } from '../../store/types';

const CartScreen = ({navigation}: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.cart);
    const { tokens } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleDelete = (itemId: string) => {
        if (tokens?.access) {
            dispatch(deleteCartItem({ token: tokens.access, itemId }));
        }
    };


   

    const renderCartItem = ({ item }: { item: Cart }) => (
        <Card style={styles.cartItem}>
            {item.product && (
                <View style={styles.cartItemContent}>
                    <ImageBackground source={{ uri: item.product.image }} style={styles.cartImage} imageStyle={{ borderRadius: 10 }}>
                        <Badge style={styles.quantityBadge}>{item.quantity}</Badge>
                    </ImageBackground>
                    <View style={styles.cartDetails}>
                        <Title style={styles.productTitle}>{item.product.name}</Title>
                        <Text style={styles.productPrice}>${item.product.price}</Text>
                    </View>
                    <IconButton 
                        icon="delete" 
                        size={24} 
                        onPress={() => handleDelete(item.id)}
                        style={styles.deleteIcon}
                    />
                </View>
            )}
        </Card>
    );

    const totalPrice = items.reduce((total, item) => total + (item.product ? item.product.price * item.quantity : 0), 0);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Panier</Title>
            <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${totalPrice}</Text>
                <Button mode="contained" onPress={() => navigation.navigate("PaymentScreen")} style={{backgroundColor: items.length > 0 ? '#6200ee' : "" , width: "100%"}} disabled={items.length <= 0}>
                  {items.length > 0 ? "Passer à la caisse"  : "vous avez rien dans le panier"}  
                </Button>
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    cartItem: {
        marginBottom: 16,
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#fff',
    },
    cartItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
      cartImage: {
        height: Dimensions.get('window').width * 0.3,
        width: Dimensions.get('window').width * 0.3,
        borderRadius: 10,
        marginRight: 10,
    },
    quantityBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#6200ee',
        color: 'white',
    },
    cartDetails: {
        flex: 1,
        padding: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#6200ee',
    },
    deleteIcon: {
        marginRight: 10,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    checkoutButton: {
        width: '100%',
        // backgroundColor: '#6200ee',
    },
});

export default CartScreen;
