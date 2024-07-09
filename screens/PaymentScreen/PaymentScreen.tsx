import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { createPaymentIntent } from '../../store/Payment/paymentAsync';
import { initStripe, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { clientSecret, loading, error } = useSelector((state: RootState) => state.payment);
    const { items } = useSelector((state: RootState) => state.cart);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [amount, setAmount] = useState<number>(0);

    const calculateTotalAmount = useCallback(() => {
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }, [items]);

    useEffect(() => {
        initStripe({
            publishableKey: 'pk_test_51NjtbSIN5lMTju9QZenolzLqr3h1hTfrDTTSKERFshQBbMDZPdb16q3WsKaDy348JSrAwydNYvOYWlfqNI78N9GE00lyyN1nmK',
        });
    }, []);

    useEffect(() => {
        setAmount(calculateTotalAmount());
    }, [items, calculateTotalAmount]);

    useEffect(() => {
        if (amount > 0) {
            dispatch(createPaymentIntent(amount * 100)); 
        }
    }, [amount, dispatch]);

    useEffect(() => {
        if (clientSecret) {
            initializePaymentSheet();
        }
    }, [clientSecret]);

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret!,
            merchantDisplayName: 'Your Merchant Name',
        });
        if (error) {
            console.error('Error initializing payment sheet', error);
        }
    };

    const handleOpenPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert('Error', 'Error presenting payment sheet');
        } else {
            Alert.alert('Success', 'Payment confirmed');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Payment</Title>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.amountTitle}>Total Amount</Title>
                    <Paragraph style={styles.amount}>{amount.toFixed(2)} €</Paragraph>
                </Card.Content>
            </Card>
            <Button
                mode="contained"
                onPress={handleOpenPaymentSheet}
                loading={loading}
                disabled={!clientSecret || loading}
                style={styles.payButton}
            >
                Pay {amount.toFixed(2)} €
            </Button>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        marginVertical: 20,
    },
    amountTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    amount: {
        fontSize: 18,
        color: '#000',
    },
    payButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#6200ee',
    },
    errorText: {
        color: 'red',
        marginTop: 16,
        textAlign: 'center',
    },
});

export default PaymentScreen;
