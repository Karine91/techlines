import { Center, Wrap, WrapItem } from "@chakra-ui/react";

import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../types/Product";

const ProductScreen = () => {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setData(res.data.products);
      })
      .catch((error) => console.log("Error", error));
  }, []);

  return (
    <Wrap
      spacing="30px"
      justify="center"
      minHeight="80vh"
      mx={{ base: "12", md: "20", lg: "32" }}
    >
      {data.map((product) => (
        <WrapItem key={product._id}>
          <Center w="250px" h="550px">
            <ProductCard product={product} loading={false} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ProductScreen;
