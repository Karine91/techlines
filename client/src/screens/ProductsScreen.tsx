import { Center, Wrap, WrapItem, Button } from "@chakra-ui/react";

import { useEffect } from "react";
import ProductCard from "../features/product/components/ProductCard";

import { getProducts } from "../redux/actions/productActions";
import { useAppDispatch, useAppSelector } from "../redux/storeHooks";
import { getStatuses } from "../redux/slices/product";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import AlertError from "../components/AlertError";

const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const {
    products: data,
    pagination: { currentPage, totalPages },
    error,
    favoritesToggled,
  } = useAppSelector((state) => state.products);
  const { isSuccess } = useAppSelector(getStatuses);

  useEffect(() => {
    dispatch(getProducts({ page: 1 }));
  }, [dispatch]);

  const onPageChange = (page: number) => {
    dispatch(getProducts({ page }));
  };

  return (
    <>
      <Wrap
        spacing="30px"
        justify="center"
        minHeight="80vh"
        mx={{ base: "12", md: "20", lg: "32" }}
      >
        {error ? (
          <AlertError error={error} />
        ) : (
          data.map((product) => (
            <WrapItem key={product._id}>
              <Center w="250px" h="450px">
                <ProductCard product={product} isLoaded={isSuccess} />
              </Center>
            </WrapItem>
          ))
        )}
      </Wrap>
      {!favoritesToggled && data.length ? (
        <Wrap spacing="10px" justify="center" p="5">
          <Button
            colorScheme="cyan"
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ArrowLeftIcon />
          </Button>
          {Array.from(Array(totalPages), (_, ind) => (
            <Button
              key={ind}
              colorScheme={currentPage === ind + 1 ? "cyan" : "gray"}
              onClick={() => onPageChange(ind + 1)}
            >
              {ind + 1}
            </Button>
          ))}
          <Button
            colorScheme="cyan"
            isDisabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ArrowRightIcon />
          </Button>
        </Wrap>
      ) : null}
    </>
  );
};

export default ProductsScreen;
