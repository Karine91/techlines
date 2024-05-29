import React from "react";
import { HStack } from "@chakra-ui/react";
import Star from "./Star";

const RatingStars = ({ rating = 0 }: { rating?: number }) => {
  return (
    <HStack spacing="2px">
      <Star rating={rating} star={1} />
      <Star rating={rating} star={2} />
      <Star rating={rating} star={3} />
      <Star rating={rating} star={4} />
      <Star rating={rating} star={5} />
    </HStack>
  );
};

export default RatingStars;
