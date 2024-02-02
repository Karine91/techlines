import { Button } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, To } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  to: To;
  ariaLabel?: string;
}

const NavLink = ({ children, to, ariaLabel = "" }: IProps) => {
  return (
    <Button
      aria-label={ariaLabel}
      as={RouterLink}
      px="2"
      py="1"
      rounded="md"
      variant="ghost"
      to={to}
      transition="background ease .3s"
    >
      {children}
    </Button>
  );
};

export default NavLink;
