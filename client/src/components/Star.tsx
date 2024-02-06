import React from "react";
import { StarIcon } from "@chakra-ui/icons";

const Star = ({ rating, star }: { rating: number; star: number }) => {
  return (
    <StarIcon
      color={
        rating === 0 ? "gray.200" : rating >= star ? "cyan.500" : "gray.200"
      }
    />
  );
};

export default Star;
