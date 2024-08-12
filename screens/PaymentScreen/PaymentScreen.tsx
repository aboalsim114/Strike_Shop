import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { initStripe, useStripe, CardField } from '@stripe/stripe-react-native';
import { createPaymentIntent } from '../../store/Payment/paymentAsync';
import { resetClientSecret } from '../../store/Payment/paymentSlice';

const PaymentScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { tokens } = useSelector((state: RootState) => state.auth);
  const { clientSecret, loading, error } = useSelector((state: RootState) => state.payment);
  const { initPaymentSheet, presentPaymentSheet, createPaymentMethod } = useStripe();
  const [amount, setAmount] = useState<number>(0);
  const [cardDetailsComplete, setCardDetailsComplete] = useState<boolean>(false);

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

  const handleCreatePaymentIntent = async () => {
    if (!tokens?.access) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    if (!cardDetailsComplete) {
      Alert.alert('Error', 'Card details are not complete');
      return;
    }

    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert('Error', `Failed to create payment method: ${error.message}`);
      return;
    }

    if (paymentMethod) {
      dispatch(resetClientSecret());
      dispatch(createPaymentIntent({ amount, paymentMethodId: paymentMethod.id, token: tokens.access }));
    }
  };

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  const initializePaymentSheet = async () => {
    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret!,
        merchantDisplayName: 'StrikeShop',
      });
      if (error) {
        throw new Error(`Payment sheet init error: ${error.message}`);
      }
    } catch (error: any) {
      Alert.alert('Error', `Failed to initialize payment sheet: ${error.message}`);
    }
  };

  const handleOpenPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert('Error', `Payment sheet error: ${error.message}`);
      } else {
        Alert.alert('Success', 'Payment confirmed');
      }
    } catch (error: any) {
      Alert.alert('Error', `Unexpected error: ${error.message}`);
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

      {/* CardField for card details input */}
      <CardField
  postalCodeEnabled={true}
  placeholders={{
    number: '4242 4242 4242 4242',
  }}
  cardStyle={{
    backgroundColor: '#FFFFFF',  
    textColor: '#000000',
  }}
  style={styles.cardFieldContainer}
  onCardChange={(cardDetails) => {
    setCardDetailsComplete(cardDetails.complete);
  }}
/>


      <Button
        mode="contained"
        onPress={handleCreatePaymentIntent}
        loading={loading}
        disabled={loading || !cardDetailsComplete}
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
  cardFieldContainer: {
    height: 50,
    marginVertical: 30,
    width: '100%',
  },
  cardField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
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
