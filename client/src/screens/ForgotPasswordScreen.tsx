import PasswordForgottenForm from "../features/auth/PasswordForgottenForm";
import { useToast } from "@chakra-ui/react";

const ForgotPasswordScreen = () => {
  const toast = useToast();

  const onSuccess = (serverMsg: string | null) => {
    if (serverMsg) {
      toast({
        description: `${serverMsg}`,
        status: "success",
        isClosable: true,
      });
    }
  };

  return <PasswordForgottenForm onSuccess={onSuccess} />;
};

export default ForgotPasswordScreen;
