import { Center, Wrap, WrapItem } from "@chakra-ui/react";

import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../types/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { RootState, AppDispatch } from "../redux/store";
import { getStatuses } from "../redux/slices/product";

const ProductScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products: data } = useSelector((state: RootState) => state.products);
  const { isSuccess } = useSelector(getStatuses);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
            <ProductCard product={product} isLoaded={isSuccess} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ProductScreen;
