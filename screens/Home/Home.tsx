import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { Text, Searchbar, Title, Paragraph } from 'react-native-paper';
import CategoryList from '../../components/CategoryList';
import { fetchProducts } from '../../store/Products/productAsync';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import Product from '../../components/Product/Product';

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Searchbar
                    placeholder="Rechercher des articles"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />

                <CategoryList />

                <Title style={styles.productTitle}>Populaire</Title>
                <Paragraph style={styles.productSubtitle}>Meilleures ventes | Nouveautés</Paragraph>
                <View style={styles.productList}>
                    {products && products.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollView: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    searchbar: {
        marginVertical: 16,
    },
    productTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productSubtitle: {
        color: '#777',
        marginBottom: 16,
    },
    productList: {
        marginBottom: 16,
    },
});

export default HomeScreen;
