import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { Link as ReactLink, useParams } from "react-router-dom";
import * as Yup from "yup";
import AlertError from "../components/AlertError";
import PasswordField from "../features/auth/components/PasswordField";
import { resetPassword } from "../redux/actions/userActions";
import { getUserStatuses, stateReset } from "../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../redux/storeHooks";
import { validationMessages } from "../utils/validation";

interface IFormState {
  password: string;
  confirmPassword: string;
}

const initState: IFormState = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: validationMessages.password,
  confirmPassword: validationMessages.confirmPassword,
});

const PasswordResetScreen = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [resetSuccess, setResetSuccess] = useState(false);

  const { error, serverMsg } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector(getUserStatuses);

  const handleSubmit = async (values: IFormState) => {
    if (token) {
      const promise = await dispatch(
        resetPassword({ password: values.password, token })
      );
      if (promise.meta.requestStatus === "fulfilled") {
        dispatch(stateReset());
        setResetSuccess(true);
        toast({
          description: `${serverMsg}`,
          status: "success",
          isClosable: true,
        });
      }
    }
  };

  return resetSuccess ? (
    <Center minH="90vh">
      <VStack>
        <Text my="10" fontSize="xl">
          Password reset successful!
        </Text>
        <Button
          as={ReactLink}
          to="/login"
          variant="outline"
          colorScheme="cyan"
          w="300px"
        >
          Log in
        </Button>
        <Button
          as={ReactLink}
          to="/products"
          variant="outline"
          colorScheme="cyan"
          w="300px"
        >
          Products
        </Button>
      </VStack>
    </Center>
  ) : (
    <Formik
      initialValues={initState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH="4xl"
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={{ base: "xs", md: "sm" }}>
                  Reset your password.
                </Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ base: "transparent", md: "bg-surface" }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <form onSubmit={formik.handleSubmit}>
                {error && <AlertError error={error} />}
                <Stack spacing="5">
                  <FormControl>
                    <PasswordField
                      type="password"
                      name="password"
                      placeholder="Your password"
                      label="New Password"
                    />
                    <PasswordField
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      label="Confirm your password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="cyan"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Set new Password
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default PasswordResetScreen;
