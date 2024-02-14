import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  IconButtonProps,
  TextProps,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { GiTechnoHeart } from "react-icons/gi";
import FavoritesToggler from "./FavoritesToggler";
import ColorModeToggle from "./ColorModeToggle";
import NavLink from "./NavLink";
import { BsPhoneFlip } from "react-icons/bs";
import { BiUserCheck } from "react-icons/bi";
import { TbShoppingCart } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const links = [
  { name: "Products", path: "/products" },
  { name: "Hot deals", path: "/hot-deals" },
  { name: "Contacts", path: "/contacts" },
  { name: "Services", path: "/services" },
];

const CartIcon = ({
  iconProps,
  textProps,
}: {
  iconProps?: Omit<IconButtonProps, "aria-label">;
  textProps?: TextProps;
}) => {
  const { ids } = useSelector((store: RootState) => store.cart);
  return (
    <Box>
      <IconButton
        aria-label="shopping cart"
        icon={<TbShoppingCart size="20px" />}
        as={RouterLink}
        to="/cart"
        variant="ghost"
        {...iconProps}
      />
      {ids.length ? (
        <Text
          fontWeight="bold"
          fontSize="sm"
          fontStyle="italic"
          mt="-6"
          {...textProps}
        >
          {ids.length}
        </Text>
      ) : null}
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box bg={useColorModeValue("cyan.300", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex
          display={{ base: "flex", md: "none" }}
          position="relative"
          alignItems="center"
        >
          <IconButton
            aria-label="menu"
            bg="parent"
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
          />
          <CartIcon
            iconProps={{
              ml: "12px",
              position: "absolute",
              top: 0,
              bottom: 0,
            }}
            textProps={{
              ml: "74px",
            }}
          />
        </Flex>

        <HStack spacing="8" alignItems="center">
          <Box alignItems="center" display="flex" as={RouterLink} to="/">
            <Icon
              as={BsPhoneFlip}
              h="6"
              w="6"
              color={useColorModeValue("black", "yellow.200")}
            />
            <Text as="b">Tech Lines</Text>
          </Box>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
            <CartIcon
              textProps={{
                ml: "26px",
              }}
            />
            <ColorModeToggle />
            <FavoritesToggler />
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <BiUserCheck />
        </Flex>
      </Flex>
      <Box display="flex">
        {isOpen && (
          <Box pb="4" display={{ md: "none" }}>
            <Stack as="nav" spacing="4">
              {links.map((link) => (
                <NavLink to={link.path} key={link.path}>
                  <Text fontWeight="medium">{link.name}</Text>
                </NavLink>
              ))}
            </Stack>
            <FavoritesToggler />
            <ColorModeToggle />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
