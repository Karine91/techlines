import {
  Center,
  Wrap,
  WrapItem,
  Button,
  AlertTitle,
  AlertDescription,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { RootState, AppDispatch } from "../redux/store";
import { getStatuses } from "../redux/slices/product";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const ProductScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products: data,
    pagination: { currentPage, totalPages },
    error,
    favoritesToggled,
  } = useSelector((state: RootState) => state.products);
  const { isSuccess } = useSelector(getStatuses);

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
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          data.map((product) => (
            <WrapItem key={product._id}>
              <Center w="250px" h="550px">
                <ProductCard product={product} isLoaded={isSuccess} />
              </Center>
            </WrapItem>
          ))
        )}
      </Wrap>
      {!favoritesToggled && data.length && (
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
      )}
    </>
  );
};

export default ProductScreen;
