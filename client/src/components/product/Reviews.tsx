import React from "react";
import { Stack, SimpleGrid, Flex, Box, Text } from "@chakra-ui/react";
import { IReview } from "../../types/Product";
import RatingStars from "./RatingStars";

const Reviews = ({
  reviews,
  rating,
}: {
  reviews: IReview[];
  rating: number;
}) => {
  return (
    <Stack>
      <Text fontSize="xl" fontWeight="bold">
        Reviews
      </Text>
      {reviews.length ? (
        <SimpleGrid minChildWidth={"300px"} spacingX="40px" spacingY="20px">
          {reviews.map((review) => (
            <Box key={review._id}>
              <Flex gap="2px" alignItems="center">
                <RatingStars rating={rating} />
                {review.title && (
                  <Text fontWeight="semibold" ml="4px">
                    {review.title}
                  </Text>
                )}
              </Flex>
              <Box py="12px">{review.comment}</Box>
              <Text fontSize="sm" color="gray.300">
                by {review.name}, {new Date(review.createdAt).toDateString()}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No reviews.</Text>
      )}
    </Stack>
  );
};

export default Reviews;
