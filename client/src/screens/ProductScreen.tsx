import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  Wrap,
  Image,
  useToast,
} from "@chakra-ui/react";
import { BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { getStatuses } from "../redux/slices/product";
import AlertError from "../components/AlertError";
import RatingStars from "../components/RatingStars";
import Reviews from "../components/Reviews";
import { cartItemAdd, getCartItemFromProduct } from "../redux/slices/cart";

const ProductScreen = () => {
  const { id } = useParams();
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { product, error } = useSelector((state: RootState) => state.products);
  const { isLoading, isIdle } = useSelector((state: RootState) =>
    getStatuses(state)
  );
  const { entities } = useSelector((state: RootState) => state.cart);
  const [amount, setAmount] = useState(
    id && entities[id] ? entities[id].qty : 1
  );

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, []);

  const addToCartHandle = () => {
    if (entities[id!] && product) {
      dispatch(cartItemAdd(getCartItemFromProduct(product, amount)));
      toast({
        description: "Item has been added.",
        status: "success",
        isClosable: true,
      });
    }
  };

  const increaseAmount = () => {
    setAmount((amount) => Math.min(amount + 1, product!.stock));
  };

  const decreaseAmount = () => {
    setAmount((amount) => Math.max(amount - 1, 1));
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {(isLoading || isIdle) && (
        <Stack direction="row" spacing="4">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </Stack>
      )}
      {error && <AlertError error={error} />}
      {product && (
        <Box
          maxW={{ base: "3xl", lg: "5xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack direction={{ base: "column", lg: "row" }} align="flex-start">
            <Stack
              pr={{ base: "0", md: "row" }}
              flex="1.5"
              mb={{ base: "12", md: "none" }}
            >
              {product.productIsNew && (
                <Badge
                  p="2"
                  rounded="md"
                  w="50px"
                  fontSize="0.8em"
                  colorScheme="green"
                >
                  New
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge
                  rounded="full"
                  w="70px"
                  fontSize="0.8em"
                  colorScheme="red"
                >
                  sold out
                </Badge>
              )}
              <Heading fontSize="2xl" fontWeight="extrabold">
                {product.brand} {product.name}
              </Heading>
              <Stack spacing="5">
                <Box>
                  <Text fontSize="xl">${product.price}</Text>
                  <Flex>
                    <RatingStars rating={product.rating} />
                    {product.numberOfReviews ? (
                      <Text fontSize="md" fontWeight="bold" ml="4px">
                        {`${product.numberOfReviews} ${
                          product.numberOfReviews === 1 ? "Review" : "Reviews"
                        }`}
                      </Text>
                    ) : null}
                  </Flex>
                </Box>
                <Text>{product.subtitle}</Text>
                <Text>{product.description}</Text>
                <Text fontWeight="bold">Quantity</Text>
                <Flex
                  w="170px"
                  p="5px"
                  border="1px"
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <Button isDisabled={amount <= 1} onClick={decreaseAmount}>
                    <MinusIcon />
                  </Button>
                  <Text mx="30px">{amount}</Text>
                  <Button
                    isDisabled={amount > product.stock}
                    onClick={increaseAmount}
                  >
                    <SmallAddIcon />
                  </Button>
                </Flex>
                <Badge
                  fontSize="lg"
                  width="170px"
                  textAlign="center"
                  colorScheme="gray"
                >
                  In Stock: {product.stock}
                </Badge>
                <Button
                  variant="outline"
                  isDisabled={product.stock === 0}
                  colorScheme="cyan"
                  onClick={addToCartHandle}
                >
                  Add to cart
                </Button>
                <Stack width="270px">
                  <Flex alignItems="center">
                    <BiPackage size="20px" />
                    <Text fontWeight="medium" fontSize="sm" ml="2">
                      Shipped in 2-3 days
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <BiCheckShield size="20px" />
                    <Text fontWeight="medium" fontSize="sm" ml="2">
                      2 year extended warranty
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <BiSupport size="20px" />
                    <Text fontWeight="medium" fontSize="sm" ml="2">
                      We're here for you 24/7
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction="column"
              align="center"
              flex="1"
              _dark={{ bg: "gray.900" }}
            >
              <Image
                mb="30px"
                src={product.images[0]}
                alt={product.name}
                fallbackSrc="https://via.placeholder.com/250"
              />
              <Image
                mb="30px"
                src={product.images[1]}
                alt={product.name}
                fallbackSrc="https://via.placeholder.com/250"
              />
            </Flex>
          </Stack>
          {product.reviews?.length ? (
            <Reviews rating={product.rating} reviews={product.reviews} />
          ) : null}
        </Box>
      )}
    </Wrap>
  );
};

export default ProductScreen;
