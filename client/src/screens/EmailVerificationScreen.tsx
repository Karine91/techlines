import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AlertError from "../components/AlertError";
import Loader from "../components/Loader";
import { verifyEmail } from "../redux/actions/userActions";
import { getUserStatuses } from "../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../redux/storeHooks";

const EmailVerificationScreen = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);
  const { isLoading } = useSelector(getUserStatuses);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [token, dispatch]);

  return (
    <Box position="relative" minH="3xl">
      <AbsoluteCenter axis="both">
        {isLoading ? (
          <Box textAlign="center">
            <Text fontSize="3xl">We are working on verifying your email.</Text>
            <Loader />
          </Box>
        ) : error ? (
          <AlertError bg="parent" error={error} />
        ) : (
          <Alert
            bg="parent"
            status="success"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="16" />
            <AlertTitle>Thanks for verifying your email.</AlertTitle>
            <AlertDescription fontSize="xl">
              You can close this window now.
            </AlertDescription>
          </Alert>
        )}
      </AbsoluteCenter>
    </Box>
  );
};

export default EmailVerificationScreen;
