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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { Link as ReactLink, useParams } from "react-router-dom";
import * as Yup from "yup";
import AlertError from "../components/AlertError";
import PasswordField from "../components/auth/PasswordField";
import { resetPassword } from "../redux/actions/userActions";
import { getUserStatuses, stateReset } from "../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../redux/store";
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
  password: validationMessages.password.required(
    validationMessages.required("Password field")
  ),
  confirmPassword: validationMessages.password
    .required(validationMessages.required("Confirm password field"))
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// if no token probably make sense to redirect somewhere

const PasswordResetScreen = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { error, serverStatus, serverMsg } = useAppSelector(
    (state) => state.user
  );
  const { isLoading } = useAppSelector(getUserStatuses);

  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (serverMsg) {
      toast({
        description: `${serverMsg}`,
        status: "success",
        isClosable: true,
      });
      dispatch(stateReset());
    }
  }, [toast, serverMsg, dispatch]);

  const handleSubmit = (values: IFormState) => {
    if (token) {
      dispatch(resetPassword({ password: values.password, token }));
    }
  };

  return serverStatus ? (
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
                <Heading size={headingBR}>Reset your password.</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
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
