import {
  CloseButton,
  Flex,
  Image,
  Select,
  Spacer,
  Text,
  VStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ICartItem } from "../../redux/slices/cart";
import { getFormattedPrice } from "../../utils/getFormattedPrice";
import { cartItemRemove, cartItemAdd } from "../../redux/slices/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ChangeEvent } from "react";

const CartItem = (cartItem: ICartItem) => {
  const { name, image, brand, id, stock, price, qty } = cartItem;
  const dispatch = useDispatch<AppDispatch>();

  const onRemoveItem = () => {
    dispatch(cartItemRemove(id));
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(cartItemAdd({ ...cartItem, qty: parseInt(e.target.value) }));
  };

  return (
    <Flex minWidth="300px" borderWidth="1px" rounded="lg" align="center">
      <Image
        rounded="lg"
        w="120px"
        h="120px"
        fit="cover"
        src={image}
        p="2"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <VStack p="2" w="100%" spacing="4" align="stretch">
        <Flex alignItems="center" justify="space-between">
          <Text fontWeight="medium">
            {brand} {name}
          </Text>
          <Spacer />
          <CloseButton onClick={onRemoveItem} />
        </Flex>
        <Spacer />
        <Flex alignItems="center" justify="space-between">
          <Select
            maxW="68px"
            focusBorderColor={mode("cyan.500", "cyan.200")}
            value={qty}
            onChange={onSelectChange}
          >
            {Array.from({ length: stock }, (el, ind) => ind + 1).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Text fontWeight="bold">{getFormattedPrice(price)}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default CartItem;
