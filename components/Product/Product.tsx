import React,{useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button, Avatar, Paragraph } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addProductToCart } from '../../store/Panier/cartAsync';
import { Image } from 'react-native';

interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}




const Product: React.FC<ProductProps> = ({ id, name, description, price, image }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleAddToCart = () => {
        if (user?.id) {
            dispatch(addProductToCart({ user_id: user.id, product_id: id }));
        } else {
            console.error('User not logged in');
        }
    };



    useEffect(() => {
        console.log('image : ', image);
        
    })
 
    
    return (
        <Card key={id} style={styles.card}>
            <Card.Title
                title={name}
            />
            <Card.Content>
                <Paragraph>{description}</Paragraph>
                <Paragraph style={styles.price}>${price}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => navigation.navigate('ProductDetail', { productId: id })} style={styles.button}>
                    Voir plus
                </Button>
                <Button onPress={handleAddToCart} style={styles.button}>
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
    image: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover' 
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

export default Product
