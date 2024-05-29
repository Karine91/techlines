import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const Star = ({ rating, star }: { rating: number; star: number }) => {
  const half = rating === star - 0.5;
  console.log(rating, star, half);
  return (
    <Box position="relative">
      {half && (
        <StarIcon
          position="absolute"
          top="2px"
          left="0"
          w="100%"
          h="100%"
          color="cyan.500"
          sx={{
            path: {
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)",
            },
          }}
        />
      )}
      <StarIcon
        color={
          rating === 0 ? "gray.200" : rating >= star ? "cyan.500" : "gray.200"
        }
      />
    </Box>
  );
};

export default Star;
