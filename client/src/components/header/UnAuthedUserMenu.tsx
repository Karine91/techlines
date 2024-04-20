import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { BiLogInCircle } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";

const UnAuthedUserMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        cursor="pointer"
        icon={<BiLogInCircle size="25px" />}
      />
      <MenuList>
        <MenuItem as={RouterLink} to="/login" p="2" fontWeight="400">
          Sign in
        </MenuItem>
        <MenuDivider />
        <MenuItem as={RouterLink} to="/registration" p="2" fontWeight="400">
          Sign up
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UnAuthedUserMenu;
