import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box, IconProps } from "@chakra-ui/react";

export interface IStarProps {
  rating: number;
  star: number;

  size?: IconProps["boxSize"];
  onMouseOver?: (star: number) => void;
  onClick?: (rating: number) => void;
}

const Star = ({ rating, star, size, onMouseOver, onClick }: IStarProps) => {
  const part = rating > star - 1 && rating < star;
  const partPercentage = part && Math.round((rating - (star - 1)) * 100);

  const handleMouseOver = () => {
    onMouseOver?.(star);
  };

  const handleClick = () => {
    onClick?.(star);
  };

  return (
    <Box position="relative">
      {part && (
        <StarIcon
          position="absolute"
          top="2px"
          left="0"
          w="100%"
          h="100%"
          boxSize={size}
          color="cyan.500"
          sx={{
            path: {
              clipPath: `polygon(0 0, ${partPercentage}% 0, ${partPercentage}% 100%, 0% 100%)`,
            },
          }}
        />
      )}
      <StarIcon
        boxSize={size}
        color={
          rating === 0 ? "gray.200" : rating >= star ? "cyan.500" : "gray.200"
        }
        onMouseOver={handleMouseOver}
        onClick={handleClick}
      />
    </Box>
  );
};

export default Star;
