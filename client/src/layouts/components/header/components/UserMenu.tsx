import React from "react";
import {
  Menu,
  MenuButton,
  HStack,
  MenuList,
  Text,
  Divider,
  MenuItem,
  MenuDivider,
  useToast,
  Image,
} from "@chakra-ui/react";
import { BiUserCheck } from "react-icons/bi";
import { useAppDispatch } from "../../../../redux/store";
import { Link as RouterLink } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { logout } from "../../../../redux/actions/userActions";
import { IUserInfo } from "../../../../redux/slices/user";
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";

const UserMenu = ({ userInfo }: { userInfo: IUserInfo }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const logoutHandler = () => {
    if (userInfo.googleId) {
      googleLogout();
    }
    dispatch(logout());
    toast({
      description: "You have been logged out.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Menu>
      <MenuButton rounded="full" cursor="pointer" minW="0">
        <HStack>
          {userInfo.googleImage ? (
            <Image
              borderRadius="full"
              boxSize="40px"
              src={userInfo.googleImage}
              referrerPolicy="no-referrer"
            />
          ) : (
            <BiUserCheck size="30" />
          )}

          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <HStack>
          <Text pl="3" as="i">
            {userInfo.email}
          </Text>
          {userInfo.googleId && <FcGoogle />}
        </HStack>
        <Divider py="1" />
        <MenuItem as={RouterLink} to="/order-history">
          Order History
        </MenuItem>
        <MenuItem as={RouterLink} to="/profile">
          Profile
        </MenuItem>
        {userInfo.isAdmin && (
          <>
            <MenuDivider />
            <MenuItem as={RouterLink} to="/admin-console">
              Admin Console
            </MenuItem>
          </>
        )}
        <MenuDivider />
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
