import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
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
            console.error('Error presenting payment sheet', error);
        } else {
            console.log('Payment confirmed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment</Text>
            <Button
                mode="contained"
                onPress={handleOpenPaymentSheet}
                loading={loading}
                disabled={!clientSecret || loading}
                style={styles.payButton}
            >
                Pay {amount} €
            </Button>
            {error && <Text style={styles.errorText}>{error}</Text>}
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
    payButton: {
        backgroundColor: '#6200ee',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 16,
        textAlign: 'center',
    },
});

export default PaymentScreen;
