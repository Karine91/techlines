import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../../../redux/store";

const VerifyEmailAlert = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [showBanner, setShowBanner] = useState(
    userInfo ? !userInfo.active : false
  );

  return (
    showBanner &&
    userInfo &&
    !userInfo.active && (
      <Box>
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Email not verified!</AlertTitle>
          <AlertDescription>
            You must verify your email address.
          </AlertDescription>
          <Spacer />
          <CloseIcon cursor={"pointer"} onClick={() => setShowBanner(false)} />
        </Alert>
      </Box>
    )
  );
};

export default VerifyEmailAlert;
