import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackScreen from "./layouts/ErrorFallbackScreen";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <ChakraProvider>
        <BrowserRouter>
          <Flex direction="column" minH="100vh">
            <Navbar />
            <Flex as="main" direction="column" grow={1}>
              <ErrorBoundary
                fallback={<ErrorFallbackScreen />}
                onError={console.error}
              >
                <Routes>
                  <Route path="/products" element={<ProductsScreen />} />
                  <Route path="/" element={<LandingScreen />} />
                  <Route path="/product/:id" element={<ProductScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordScreen />}
                  />
                  <Route
                    path="/password-reset/:token"
                    element={<PasswordResetScreen />}
                  />
                  <Route
                    path="/email-verify/:token"
                    element={<EmailVerificationScreen />}
                  />
                  <Route
                    path="/registration"
                    element={<RegistrationScreen />}
                  />
                </Routes>
              </ErrorBoundary>
            </Flex>
            <Footer />
          </Flex>
        </BrowserRouter>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
