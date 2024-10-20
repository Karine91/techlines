import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  Stack,
  Text,
  TextProps,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPhoneFlip } from "react-icons/bs";
import { TbShoppingCart } from "react-icons/tb";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/storeHooks";
import ColorModeToggle from "./components/ColorModeToggle";
import FavoritesToggler from "./components/FavoritesToggler";
import NavLink from "../../../components/NavLink";
import UnAuthedUserMenu from "./components/UnAuthedUserMenu";
import UserMenu from "./components/UserMenu";
import VerifyEmailAlert from "./components/VerifyEmailAlert";

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
  const { ids } = useAppSelector((store) => store.cart);
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
  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <>
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
            {userInfo ? <UserMenu userInfo={userInfo} /> : <UnAuthedUserMenu />}
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
      <VerifyEmailAlert />
    </>
  );
};

export default Navbar;
