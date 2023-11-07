import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  IconButton,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IProduct } from "../types/Product";
import { BiExpand } from "react-icons/bi";

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
  loading: boolean;
}

const ProductCard = ({ product, loading }: IProps) => {
  return (
    <Skeleton isLoaded={!loading} _hover={{ size: "1.5" }}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth="1px"
        overflow="hidden"
        p="4"
        shadow="md"
      >
        <Image />
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
          <IconButton
            aria-label="expand"
            icon={<BiExpand size="20" />}
            size="sm"
          />
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
