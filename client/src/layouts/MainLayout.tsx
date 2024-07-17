import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/header/Navbar";

import Footer from "../components/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex as="main" direction="column" grow={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
