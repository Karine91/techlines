import React from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";

const LandingScreen = () => {
  return (
    <Box maxW="8xl" mx="auto" p={{ base: "0", lg: "12" }} minH="6xl">
      <Stack
        direction={{ base: "column-reverse", lg: "row" }}
        spacing={{ base: "0", lg: "20" }}
      >
        <Box
          width={{ lg: "sm" }}
          transform={{ base: "translateY(-50%)", lg: "none" }}
          bg={{
            base: useColorModeValue("cyan.50", "gray.700"),
            lg: "transparent",
          }}
          mx={{ base: "6", md: "8", lg: "0" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack spacing={{ base: "8", lg: "10" }}>
            <Stack spacing={{ base: "2", lg: "4" }}>
              <Flex alignItems="center">
                <Icon
                  as={BsPhoneFlip}
                  h={12}
                  w={12}
                  color={useColorModeValue("cyan.500", "yellow.200")}
                />
                <Text fontSize="4xl" fontWeight="bold">
                  Tech Lines
                </Text>
              </Flex>
              <Heading size="xl" fontWeight="normal">
                Refresh your environment
              </Heading>
            </Stack>
            <HStack spacing="3">
              <Link
                as={RouterLink}
                to="/products"
                color={useColorModeValue("cyan.500", "yellow.200")}
              >
                Discover now
              </Link>
              <Icon
                color={useColorModeValue("cyan.500", "yellow.200")}
                as={FaArrowRight}
              />
            </HStack>
          </Stack>
        </Box>
        <Flex flex="1" overflow="hidden">
          <Image
            src={useColorModeValue(
              "images/landing-light.jpg",
              "images/landing-dark.jpg"
            )}
            fallback={<Skeleton />}
            maxH="550px"
            minW="300px"
            objectFit="cover"
            flex="1"
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default LandingScreen;
