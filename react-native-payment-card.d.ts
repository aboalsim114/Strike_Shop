declare module 'react-native-credit-card-input' {
  import React from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export interface CardDetails {
    number: string;
    expiry: string;
    cvc: string;
    type: string;
    name?: string;
    postalCode?: string;
  }

  export interface CreditCardInputProps {
    requiresName?: boolean;
    requiresCVC?: boolean;
    requiresPostalCode?: boolean;
    cardScale?: number;
    cardFontFamily?: string;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    validColor?: string;
    invalidColor?: string;
    placeholderColor?: string;
    onChange?: (formData: { status: string; values: CardDetails }) => void;
    allowScroll?: boolean;
    inputContainerStyle?: ViewStyle;
  }

  export class CreditCardInput extends React.Component<CreditCardInputProps> {}
  export class LiteCreditCardInput extends React.Component<CreditCardInputProps> {}
}
