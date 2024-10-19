import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AlertError from "../components/AlertError";
import TextField from "../components/TextField";
import PasswordField from "../features/auth/components/PasswordField";
import { register } from "../redux/actions/userActions";
import { getUserStatuses } from "../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../redux/storeHooks";
import { validationMessages } from "../utils/validation";

interface IFormState {
  email: string;
  password: string;
  name: string;
}

const initState: IFormState = { email: "", password: "", name: "" };

const validationSchema = Yup.object({
  name: Yup.string().required("A name is required."),
  email: validationMessages.email,
  password: validationMessages.password,
  confirmPassword: validationMessages.confirmPassword,
});

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const redirect = "/products";
  const toast = useToast();
  const { error, userInfo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector(getUserStatuses);

  // TODO: make route guard with this
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: userInfo.firstLogin
          ? "Account created. Welcome aboard."
          : `Welcome back ${userInfo.name}`,
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={initState}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(register(values));
      }}
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
                  Create an account.
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already a user?</Text>
                  <Button
                    as={ReactLink}
                    to="/login"
                    variant="link"
                    colorScheme="cyan"
                  >
                    Sign in
                  </Button>
                </HStack>
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
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Your first and last name."
                      label="Full name"
                    />
                    <TextField
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      label="Email"
                    />
                    <PasswordField
                      type="password"
                      name="password"
                      placeholder="Your password"
                      label="Password"
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
                    Sign up
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

export default RegistrationScreen;
