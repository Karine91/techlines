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
    </Wrap>
  );
};

export default CartScreen;
