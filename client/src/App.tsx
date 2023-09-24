import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/products" element={<ProductScreen />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
