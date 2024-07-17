import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";

import RootComponent from "./RootComponent";
import CartScreen from "./screens/CartScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootComponent />}>
      <Route index element={<LandingScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/password-reset/:token" element={<PasswordResetScreen />} />
      <Route
        path="/email-verify/:token"
        element={<EmailVerificationScreen />}
      />
      <Route path="/registration" element={<RegistrationScreen />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
