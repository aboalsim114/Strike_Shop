import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Title, Subheading, Button, Card, Divider, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchCartItems } from '../../store/Panier/cartAsync';
import { Cart } from '../../store/types';

const CartScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const renderCartItem = ({ item }: { item: Cart }) => (
        <Card style={styles.cartItem}>
            {item.product && (
                <>
                    <Card.Cover source={{ uri: item.product.image }} style={styles.cartImage} />
                    <Card.Content>
                        <Title>{item.product.name}</Title>
                        <Text>Quantité: {item.quantity}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <IconButton 
                            icon="delete" 
                            size={24} 
                            onPress={() => console.log(`Supprimer ${item.product.name}`)}
                        />
                    </Card.Actions>
                </>
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
                ItemSeparatorComponent={() => <Divider />}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
                <Button mode="contained" onPress={() => console.log('Passer à la caisse')}>
                    Passer à la caisse
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cartItem: {
        marginBottom: 16,
    },
    cartImage: {
        height: 150,
        resizeMode: 'cover',
    },
    deleteIcon: {
        color: 'red',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default CartScreen;
