import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUserOrders } from '../../store/Orders/ordersAsync';

const OrdersScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { ongoingOrders, pastOrders, loading, error } = useSelector((state: RootState) => state.orders);
    const { tokens } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (tokens?.access) {
            dispatch(fetchUserOrders({ token: tokens.access }));
        }
    }, [dispatch, tokens]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Chargement de vos commandes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erreur : {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Title style={styles.title}>Commandes en cours</Title>
                {ongoingOrders.length > 0 ? (
                    ongoingOrders.map((order) => (
                        <Card key={order.id} style={styles.card}>
                            <Card.Content>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.orderId}>Commande #{order.id}</Text>
                                    <IconButton icon="clock-outline" size={20} />
                                </View>
                                <Paragraph>Statut : <Text style={styles.status}>{order.status}</Text></Paragraph>
                                <Paragraph>Total : <Text style={styles.amount}>{order.total_amount} €</Text></Paragraph>
                                <Button mode="outlined" onPress={() => {}} style={styles.button}>Voir les détails</Button>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <Text style={styles.noOrdersText}>Aucune commande en cours.</Text>
                )}
            </View>

            <View style={styles.section}>
                <Title style={styles.title}>Commandes passées</Title>
                {pastOrders.length > 0 ? (
                    pastOrders.map((order) => (
                        <Card key={order.id} style={styles.card}>
                            <Card.Content>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.orderId}>Commande #{order.id}</Text>
                                    <IconButton icon="check-circle-outline" size={20} />
                                </View>
                                <Paragraph>Statut : <Text style={styles.status}>{order.status}</Text></Paragraph>
                                <Paragraph>Total : <Text style={styles.amount}>{order.total_amount} €</Text></Paragraph>
                                <Button mode="outlined" onPress={() => {}} style={styles.button}>Commander à nouveau</Button>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <Text style={styles.noOrdersText}>Aucune commande passée.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6200ee',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    card: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    status: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    amount: {
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        marginTop: 10,
        borderColor: '#6200ee',
    },
    noOrdersText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OrdersScreen;
