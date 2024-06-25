import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Title, Subheading, Button, Card, Divider, IconButton } from 'react-native-paper';

const cartItems = [
    {
        id: '1',
        name: 'StatTrak™ AK-47 | Redline',
        price: 249.95,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        name: 'AWP | Dragon Lore',
        price: 289.95,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/150',
    },
];

const CartScreen = () => {

    const renderCartItem = ({ item }: { item: typeof cartItems[0] }) => (
        <Card style={styles.cartItem}>
            <Card.Cover source={{ uri: item.imageUrl }} style={styles.cartImage} />
            <Card.Content>
                <Title>{item.name}</Title>
                <Subheading>${item.price.toFixed(2)}</Subheading>
                <Text>Quantité: {item.quantity}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton 
                    icon="delete" 
                    size={24} 
                    onPress={() => console.log(`Supprimer ${item.name}`)}
                />
            </Card.Actions>
        </Card>
    );

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Panier</Title>
            <FlatList
                data={cartItems}
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
