import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Star, { type IStarProps } from "./Star";

const RatingStars = ({
  rating: initRating,
  edit = false,
  onClick,
  ...starProps
}: Omit<IStarProps, "star"> & { edit?: boolean }) => {
  const [rating, setRating] = useState(initRating);

  const onMouseOver = (star: number) => {
    if (edit) {
      setRating(star);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    onClick?.(value);
  };

  return (
    <HStack spacing="2px" onMouseLeave={() => edit && setRating(initRating)}>
      <Star
        {...starProps}
        star={1}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        {...starProps}
        star={2}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        {...starProps}
        star={3}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        {...starProps}
        star={4}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
      <Star
        {...starProps}
        star={5}
        rating={rating}
        onMouseOver={onMouseOver}
        onClick={handleRatingChange}
      />
    </HStack>
  );
};

export default RatingStars;
