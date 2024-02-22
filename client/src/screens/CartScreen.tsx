import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue,
  Spinner,
  Wrap,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { RootState } from "../redux/store";

const CartScreen = () => {
  const { ids, entities } = useSelector((state: RootState) => state.cart);

  const heading = `(${ids.length} Item${ids.length > 1 ? "s" : ""})`;

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {!ids.length && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your cart is empty.</AlertTitle>
          <AlertDescription>
            <Link as={RouterLink} to="/products">
              Click here to see our products.
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <Box px="4" py="8" w={{ base: "95%", md: "70%", lg: "50%" }}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl">Shopping Cart</Heading>
            <Stack spacing="6">
              {ids.map((id) => {
                const item = entities[id];
                return <CartItem key={id} {...item} />;
              })}
            </Stack>
          </Stack>
          <Flex direction="column" align="center" flex="1">
            <OrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link
                as={RouterLink}
                to="/products"
                color={useColorModeValue("cyan.500", "cyan.200")}
              >
                Continue Shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </Wrap>
  );
};

export default CartScreen;
