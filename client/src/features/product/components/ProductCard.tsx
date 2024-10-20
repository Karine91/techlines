import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Text,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiExpand } from "react-icons/bi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/product";
import { useAppSelector, useAppDispatch } from "../../../redux/storeHooks";
import { IProduct } from "../../../types/Product";
import { Link as RouterLink } from "react-router-dom";
import {
  cartItemAdd,
  getCartItemFromProduct,
} from "../../../redux/slices/cart";
import { TbShoppingCartPlus } from "react-icons/tb";

interface IProps {
  product: IProduct;
  isLoaded: boolean;
}

const ProductCard = ({ product, isLoaded }: IProps) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.products);
  const [isShown, setIsShown] = useState(false);
  const { entities } = useAppSelector((state) => state.cart);
  const toast = useToast();

  const cartPlusDisabled =
    entities[product._id] && entities[product._id].qty > product.stock;

  const inFavorites = favorites.includes(product._id);
  const FavoriteIconComponent = inFavorites
    ? MdOutlineFavorite
    : MdOutlineFavoriteBorder;

  const addToCart = () => {
    const cartItem = entities[product._id];
    dispatch(
      cartItemAdd(
        getCartItemFromProduct(product, cartItem ? cartItem.qty + 1 : 1)
      )
    );
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Skeleton isLoaded={isLoaded} _hover={{ size: "1.5" }}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth="1px"
        overflow="hidden"
        p="4"
        shadow="md"
      >
        <Image
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          src={product.images?.[isShown && product.images.length > 1 ? 1 : 0]}
          fallbackSrc="https://via.placeholder.com/150"
          alt={product.name}
          height={200}
        />
        {product.stock < 5 ? (
          <Badge>only {product.stock} left</Badge>
        ) : product.stock < 1 ? (
          <Badge colorScheme="red">Sold out</Badge>
        ) : (
          <Badge>In Stock</Badge>
        )}
        {product.productIsNew && (
          <Badge ml="2" colorScheme="purple">
            new
          </Badge>
        )}
        <Text noOfLines={1} fontSize="xl" fontWeight="semibold" mt="2">
          {product.brand} {product.name}
        </Text>
        <Text noOfLines={1} fontSize="md" color="gray.600" mt="2">
          {product.subtitle}
        </Text>
        <Flex justify="space-between" alignItems="center" mt="2">
          <Badge colorScheme="cyan">{product.category}</Badge>
          <Text fontSize="xl" fontWeight="semibold" color="cyan.600">
            ${product.price}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <IconButton
            aria-label={inFavorites ? "favorite" : "add to favorites"}
            icon={<FavoriteIconComponent size="20" />}
            onClick={() =>
              dispatch(
                inFavorites
                  ? removeFromFavorites(product._id)
                  : addToFavorites(product._id)
              )
            }
            colorScheme="cyan"
            size="sm"
          />

          <IconButton
            aria-label="expand"
            icon={<BiExpand size="20" />}
            as={RouterLink}
            to={`/product/${product._id}`}
            size="sm"
          />
          <Tooltip
            hasArrow
            label={
              cartPlusDisabled
                ? "You reached the maximum quantity of the product. "
                : product.stock <= 0
                ? "Out of stock"
                : ""
            }
          >
            <IconButton
              aria-label="add to the shopping cart"
              isDisabled={product.stock <= 0 || cartPlusDisabled}
              onClick={addToCart}
              icon={<TbShoppingCartPlus size="20" />}
              colorScheme="cyan"
              size="sm"
            />
          </Tooltip>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
