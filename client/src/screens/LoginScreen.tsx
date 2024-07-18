import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { useToast } from "@chakra-ui/react";

import LoginForm from "../features/auth/LoginForm";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      }
    }
  }, [userInfo, location.state, navigate]);

  const onSuccess = () => {
    toast({
      description: "Login successful.",
      status: "success",
      isClosable: true,
    });
    navigate("/products");
  };

  return <LoginForm onSuccess={onSuccess} />;
};

export default LoginScreen;
