import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button, Avatar, Paragraph } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/index';

interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const Product: React.FC<ProductProps> = ({ id, name, description, price, image }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    return (
        <Card key={id} style={styles.card}>
            <Card.Title
                title={name}
                left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
            />
            <Card.Content>
                <Paragraph>{description}</Paragraph>
                <Paragraph style={styles.price}>{price}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: image }} style={styles.cardImage} />
            <Card.Actions>
                <Button mode="contained" onPress={() => navigation.navigate('ProductDetail', { productId: id })} style={styles.button}>
                    voir plus 
                </Button>
                <Button onPress={() => console.log('Ajouter au Panier pressé')} style={styles.button}>
                    Ajouter au Panier
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    cardImage: {
        borderRadius: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff5722',
        marginTop: 8,
    },
    button: {
        marginLeft: 8,
        backgroundColor: '#03a9f4',
    },
});

export default Product;
