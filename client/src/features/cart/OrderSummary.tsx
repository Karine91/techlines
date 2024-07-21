import React from "react";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { getFormattedPrice } from "../../utils/getFormattedPrice";

const OrderSummary = ({ checkout = true }: { checkout?: boolean }) => {
  const { subtotal, shipping } = useAppSelector((state) => state.cart);
  return (
    <Stack
      minWidth="300px"
      spacing="8"
      borderWidth="1px"
      borderColor={useColorModeValue("cyan.500", "cyan.100")}
      rounded="lg"
      padding="8"
      w="full"
    >
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Subtotal
          </Text>
          <Text fontWeight="medium">{getFormattedPrice(subtotal)}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Shipping
          </Text>
          <Text fontWeight="medium">{getFormattedPrice(shipping)}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="xl" fontWeight="extrabold">
            Total
          </Text>
          <Text fontWeight="medium">
            {getFormattedPrice(subtotal + shipping)}
          </Text>
        </Flex>
      </Stack>
      {checkout && (
        <Button
          as={RouterLink}
          to="/checkout"
          colorScheme="cyan"
          size="lg"
          rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      )}
    </Stack>
  );
};

export default OrderSummary;
