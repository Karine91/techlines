import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import AlertError from "../../components/AlertError";
import TextField from "../../components/TextField";
import { sendResetEmail } from "../../redux/actions/userActions";
import { getUserStatuses } from "../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../redux/storeHooks";

const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email.")
    .required("An email address is required."),
});

interface IFormState {
  email: string;
}

const initState: IFormState = {
  email: "",
};

const PasswordForgottenForm = ({
  onSuccess,
}: {
  onSuccess: (msg: string | null) => void;
}) => {
  const dispatch = useAppDispatch();

  const { serverMsg, error } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector(getUserStatuses);

  const handleSubmit = async (values: IFormState) => {
    const {
      meta: { requestStatus },
    } = await dispatch(sendResetEmail(values.email));
    if (requestStatus === "fulfilled") {
      onSuccess(serverMsg);
    }
  };

  return (
    <Formik
      initialValues={initState}
      validationSchema={ForgotPasswordSchema}
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
            <Box my="4">
              <Text as="b">Enter your email address below.</Text>
              <Text>
                We'll send you an email with a link to reset your password.
              </Text>
            </Box>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ base: "transparent", md: "bg-surface" }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <form onSubmit={formik.handleSubmit}>
                {error && <AlertError error={error} />}

                <TextField
                  type="text"
                  name="email"
                  placeholder="you@example.com"
                  label="Email"
                />

                <Button
                  colorScheme="cyan"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  type="submit"
                >
                  Send Reset Email
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default PasswordForgottenForm;
