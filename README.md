# 🛒 Strike Shop

Mobile e-commerce app: browse products by category, read and post reviews, fill a cart, pay with Stripe and track your orders.

**React Native (Expo) · TypeScript · Redux Toolkit · Stripe** — backend: [Strike_Shop_API](https://github.com/aboalsim114/Strike_Shop_API) (Django).

## Features

- **Authentication**: register, login, logout, protected screens (`PrivateRoute`, `useAuthRedirect`)
- **Catalog**: product list, categories, product detail screen
- **Reviews**: users can read and add product reviews
- **Cart**: add / remove items, persisted across app restarts (`redux-persist`)
- **Payments**: card payment flow with **Stripe** (`@stripe/stripe-react-native`)
- **Orders**: order history in the user's profile
- **Forms**: validation with Formik + Yup

## Architecture

```
screens/      Welcome, Login, Register, Home, ProductDetail, Panier (cart), Payment, Orders, Profile
components/   reusable UI (Product, ProductReview, AddReview, CategoryList, Button…)
store/        Redux Toolkit slices: Auth, Products, Category, Comments, Panier, Payment, Orders
navigation/   stack + bottom tab navigation (React Navigation)
hooks/        useAuthRedirect
```

State is split into one slice per domain, and async calls to the API go through Redux thunks.

## Run it locally

Prerequisites: Node.js, the Expo Go app (or an Android / iOS emulator), and a running instance of [Strike_Shop_API](https://github.com/aboalsim114/Strike_Shop_API).

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS).

> Point the app to your backend by updating the API base URL in the code to your machine's local IP address (e.g. `http://192.168.x.x:8000`).

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` / `npm run ios` / `npm run web` | Start on a given platform |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-fix lint and formatting |

## Next improvements

- Move the API URL and Stripe publishable key into environment variables
- Add tests for the Redux slices
- Add screenshots and a demo video to this README
