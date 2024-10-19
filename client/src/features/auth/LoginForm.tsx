import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import AlertError from "../../components/AlertError";
import TextField from "../../components/TextField";
import { client } from "../../lib/api-client";
import { googleLogin, login } from "../../redux/actions/userActions";
import { getUserStatuses } from "../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../redux/storeHooks";
import PasswordField from "./components/PasswordField";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email.")
    .required("An email address is required."),
  password: Yup.string()
    .min(5, "Password is too short - must contain at least 5 characters.")
    .required("Password is required."),
});

interface IFormState {
  email: string;
  password: string;
}

const initState: IFormState = {
  email: "",
  password: "",
};

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector(getUserStatuses);

  const handleSubmit = async (values: IFormState) => {
    const {
      meta: { requestStatus },
    } = await dispatch(login(values));

    if (requestStatus === "fulfilled") {
      onSuccess();
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const {
        data: { sub, email, name, picture },
      } = await client("https://www.googleapis.com/oauth2/v3/userinfo", {
        token: response.access_token,
      });
      const {
        meta: { requestStatus },
      } = await dispatch(
        googleLogin({ email, name, googleId: sub, googleImage: picture })
      );
      if (requestStatus === "fulfilled") {
        onSuccess();
      }
    },
  });
  return (
    <Formik
      initialValues={initState}
      validationSchema={LoginSchema}
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
                <Heading fontSize={{ base: "md", lg: "xl" }}>
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text>Don't have an account?</Text>
                  <Button
                    as={RouterLink}
                    to="/registration"
                    variant="link"
                    colorScheme="cyan"
                  >
                    Sign up
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
                <Stack spacing="5" gap={0}>
                  <TextField
                    type="text"
                    name="email"
                    placeholder="you@example.com"
                    label="Email"
                  />
                  <PasswordField
                    type="password"
                    name="password"
                    placeholder="your password"
                    label="Password"
                  />

                  <Button
                    mt="2"
                    mb="6"
                    as={RouterLink}
                    to="/forgot-password"
                    size="sm"
                    colorScheme="cyan"
                    variant="outline"
                    alignSelf="start"
                  >
                    Forgot Password ?
                  </Button>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="cyan"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Sign in
                  </Button>
                  <Button
                    colorScheme="cyan"
                    size="lg"
                    fontSize="md"
                    isLoading={isLoading}
                    leftIcon={<FcGoogle />}
                    onClick={() => handleGoogleLogin()}
                  >
                    Sign in with Google
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

export default LoginForm;
