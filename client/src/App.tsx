import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

import "./axios";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/" element={<LandingScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route
              path="/password-reset/:token"
              element={<PasswordResetScreen />}
            />
            <Route
              path="/email-verify/:token"
              element={<EmailVerificationScreen />}
            />
            <Route path="/registration" element={<RegistrationScreen />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
