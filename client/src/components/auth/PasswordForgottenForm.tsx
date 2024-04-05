import React from "react";
import { Text, Stack, Box, Button } from "@chakra-ui/react";
import TextField from "../TextField";
import { Formik, Form } from "formik";
import { sendResetEmail } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface IForm {
  email: string;
}

const PasswordForgottenForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: IForm = {
    email: "",
  };

  const handleSubmit = (values: IForm) => {
    dispatch(sendResetEmail(values.email));
  };
  return (
    <>
      <Box my="4">
        <Text as="b">Enter your email address below.</Text>
        <Text>We'll send you an email with a link to reset your password.</Text>
      </Box>
      <Stack>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <TextField
              name="email"
              placeholder="Your Email Address"
              label="Email"
            />
            <Button colorScheme="yellow" type="submit" size="lg" fontSize="md">
              Send Reset Email
            </Button>
          </Form>
        </Formik>
      </Stack>
    </>
  );
};

export default PasswordForgottenForm;
