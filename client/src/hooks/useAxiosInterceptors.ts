import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-client";
import { useToast } from "@chakra-ui/react";

export const useAxiosInterceptors = () => {
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      null,
      (error) => {
        console.log(error.response?.status);
        if (error.response?.status === 401) {
          navigate("/login", { replace: true });
        }
        const message = error.response?.data?.message || error.message;

        toast({
          description: message,
          status: "error",
          isClosable: true,
        });
      }
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, toast]);
};
