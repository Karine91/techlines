import React from "react";
import { Spinner, SpinnerProps } from "@chakra-ui/react";

const Loader = (props: SpinnerProps) => {
  return (
    <Spinner
      mt="20"
      thickness="2px"
      speed="0.65s"
      emptyColor="gray.200"
      color="cyan.500"
      size="xl"
      {...props}
    />
  );
};

export default Loader;
