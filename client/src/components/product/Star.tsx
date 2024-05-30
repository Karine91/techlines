import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const Star = ({ rating, star }: { rating: number; star: number }) => {
  const part = rating > star - 1 && rating < star;
  const partPercentage = part && Math.round((rating - (star - 1)) * 100);

  return (
    <Box position="relative">
      {part && (
        <StarIcon
          position="absolute"
          top="2px"
          left="0"
          w="100%"
          h="100%"
          color="cyan.500"
          sx={{
            path: {
              clipPath: `polygon(0 0, ${partPercentage}% 0, ${partPercentage}% 100%, 0% 100%)`,
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
