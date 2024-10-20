import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import CartItem from "../features/cart/CartItem";
import OrderSummary from "../features/cart/OrderSummary";
import { useAppSelector } from "../redux/storeHooks";

const CartScreen = () => {
  const { ids, entities } = useAppSelector((state) => state.cart);

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
