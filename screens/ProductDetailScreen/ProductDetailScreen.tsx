import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/index';

const ProductDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
    const navigation = useNavigation();
    const { productId } = route.params;

    const product = {
        id: productId,
        name: 'AWP | Dragon Lore',
        description: 'AWP | Dragon Lore | Factory New',
        price: '$289.95',
        imageUrl: 'https://via.placeholder.com/150',
    };


    useEffect(() => {
    console.log('Product ID:', productId);
        
},[productId, navigation])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <View style={styles.content}>
                <Title style={styles.productTitle}>{product.name}</Title>
                <Paragraph style={styles.description}>{product.description}</Paragraph>
                <Paragraph style={styles.price}>{product.price}</Paragraph>
                <Button mode="contained" onPress={() => console.log('Ajouter au Panier pressé')}>
                    Ajouter au Panier
                </Button>
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
});

export default ProductDetailScreen;
