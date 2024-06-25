import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, Searchbar, Title, Paragraph } from 'react-native-paper';
import CategoryList from '../../components/CategoryList';

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    const products = [
        {
            id: '1',
            title: 'Noise Cancelling Wireless Headphones',
            description: 'Active Noise Cancelling | Transparency Mode',
            price: '$249.95',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: '2',
            title: 'Classic All-Day Headphones',
            description: 'High-Quality Sound | Comfortable Fit',
            price: '$289.95',
            imageUrl: 'https://via.placeholder.com/150',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Searchbar
                    placeholder="Search here"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />

                <CategoryList />

                <Title style={styles.productTitle}>Populaire</Title>
                <Paragraph style={styles.productSubtitle}>Discount | Exclusivité</Paragraph>
                <View style={styles.productList}>
                    {products.map((product) => (
                        <Card key={product.id} style={styles.card}>
                            <Card.Title
                                title={product.title}
                                left={(props) => <Avatar.Image {...props} source={{ uri: product.imageUrl }} />}
                            />
                            <Card.Content>
                                <Paragraph>{product.description}</Paragraph>
                                <Paragraph style={styles.price}>{product.price}</Paragraph>
                            </Card.Content>
                            <Card.Cover source={{ uri: product.imageUrl }} />
                            <Card.Actions>
                                <Button mode="contained" onPress={() => console.log('Buy Now pressed')} style={styles.button}>
                                    Acheter Maintenant
                                </Button>
                                <Button onPress={() => console.log('Add to Cart pressed')} style={styles.button}>
                                    Ajouter au Panier
                                </Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    searchbar: {
        marginVertical: 16,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productSubtitle: {
        marginBottom: 16,
    },
    productList: {
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    button: {
        marginLeft: 8,
    },
});

export default HomeScreen;
