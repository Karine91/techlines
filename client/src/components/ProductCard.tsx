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
} from "@chakra-ui/react";
import { useState } from "react";
import { BiExpand } from "react-icons/bi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/slices/product";
import { AppDispatch, RootState } from "../redux/store";
import { IProduct } from "../types/Product";
import { Link as RouterLink } from "react-router-dom";

const Rating = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) => {
  const [iconSize, setIconSize] = useState("14px");
  return (
    <Flex>
      <HStack spacing="2px">
        <StarIcon boxSize={iconSize} w="14px" color="orange.500" />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 2 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 3 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 4 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 5 ? "orange.500" : "gray.200"}
        />
      </HStack>
      <Text fontSize="md" fontWeight="bold" ml="4px">
        {`${numReviews} ${numReviews === 1 ? "Review" : "Reviews"}`}
      </Text>
    </Flex>
  );
};

interface IProps {
  product: IProduct;
  isLoaded: boolean;
}

const ProductCard = ({ product, isLoaded }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.products);
  const [isShown, setIsShown] = useState(false);

  const inFavorites = favorites.includes(product._id);
  const FavoriteIconComponent = inFavorites
    ? MdOutlineFavorite
    : MdOutlineFavoriteBorder;

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
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
