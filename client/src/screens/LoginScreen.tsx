import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../components/TextField";
import PasswordField from "../components/auth/PasswordField";
import { getUserStatuses } from "../redux/slices/user";
import AlertError from "../components/AlertError";
import { login } from "../redux/actions/userActions";

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

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { userInfo, error } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector(getUserStatuses);

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        // navigate("/products");
      }
      // why after navigate? we will not see it
    }

    // serverMsg used for requests - resent password
    // and send reset email
    // if (serverMsg) {
    //   toast({
    //     description: `${serverMsg}`,
    //     status: "success",
    //     isClosable: true,
    //   });
    // }
  }, [userInfo, location.state, navigate]);

  const handleSubmit = async (values: IFormState) => {
    const {
      meta: { requestStatus },
    } = await dispatch(login(values));

    if (requestStatus === "fulfilled") {
      toast({
        description: "Login successful.",
        status: "success",
        isClosable: true,
      });
      navigate("/products");
    }
  };

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
                {error && (
                  <AlertError
                    error={error}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  />
                )}
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
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
