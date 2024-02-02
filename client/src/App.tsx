import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import LandingScreen from "./screens/LandingScreen";

import "./axios";

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
          </Routes>
        </main>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
