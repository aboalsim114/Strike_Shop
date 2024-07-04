import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStack from './navigation';
import store, { persistor } from './store/store';
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider
        publishableKey="pk_test_51NjtbSIN5lMTju9QZenolzLqr3h1hTfrDTTSKERFshQBbMDZPdb16q3WsKaDy348JSrAwydNYvOYWlfqNI78N9GE00lyyN1nmK">
        <RootStack />
          </StripeProvider>
      </PersistGate>
    </Provider>
  );
}